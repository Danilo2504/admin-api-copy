import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JSONendpointWGuards } from "../../../utils/routes";
import { signInResponseDto } from "./response.dto";
import { signInInputBodyDto, SignInSchema } from "./input.dto";
import { UnauthorizedException } from "../../../exceptions/unauthorized";
import { prisma } from "../../../db";
import { parseBodySchema } from "../../../guards/zodSchemaValidator";

const { adminAccount: Admin } = prisma;
const invalidAdminMessage =
  "Invalid credentials for admin. Please check your email and password.";

type signInInputData = {
  body: signInInputBodyDto;
};

export const adminSignIn = JSONendpointWGuards<
  signInInputData,
  signInResponseDto
>([parseBodySchema(SignInSchema)], async (_req, { body }) => {
  const { email, password } = body;

  const admin = await Admin.findFirst({ where: { email } });
  if (!admin) throw new UnauthorizedException(invalidAdminMessage);

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) throw new UnauthorizedException(invalidAdminMessage);

  const token = jwt.sign(
    { id: admin.id, email: admin.email, role: admin.adminRole },
    process.env.JWT_SECRET!,
    { expiresIn: "30d" }
  );

  return {
    id: admin.id,
    email: admin.email,
    token,
    role: admin.adminRole,
  };
});
