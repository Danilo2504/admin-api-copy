import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JSONendpointWGuards } from "../../../utils/routes";
import { signUpResponseDto } from "./response.dto"; // You may need to create a response DTO for admin sign-up
import { signUpInputBodyDto, SignUpSchema } from "./input.dto"; // You may need to create an input DTO for admin sign-up
import { prisma } from "../../../db";
import { parseBodySchema } from "../../../guards/zodSchemaValidator";
import { UnauthorizedException } from "../../../exceptions/unauthorized";
import { AdminRole } from "@prisma/client";

const { adminAccount: Admin } = prisma;

type signUpInputData = {
  body: signUpInputBodyDto;
};

export const adminSignUp = JSONendpointWGuards<
  signUpInputData,
  signUpResponseDto
>([parseBodySchema(SignUpSchema)], async (_req, { body }) => {
  const { email, password, role } = body;

  // Check if the admin with the provided email already exists
  const existingAdmin = await Admin.findFirst({ where: { email } });
  if (existingAdmin) {
    throw new UnauthorizedException(
      "Invalid email and password, please try again"
    );
  }

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new admin in the database
  const newAdmin = await Admin.create({
    data: {
      email,
      password: hashedPassword,
      adminRole: role as AdminRole,
    },
  });

  const token = jwt.sign(
    { id: newAdmin.id, email: newAdmin.email, role },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  return {
    id: newAdmin.id,
    email: newAdmin.email,
    token,
    role,
    message: "Admin successfully registered.",
  };
});
