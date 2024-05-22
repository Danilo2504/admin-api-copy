import { generateSchema } from "@anatine/zod-openapi";
// import { AdminRole } from "@prisma/client";
import * as z from "zod";

export const SignUpSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().max(255),
  role: z.string().max(255),
});

export const SignUp = generateSchema(SignUpSchema);

export type signUpInputBodyDto = z.infer<typeof SignUpSchema>;
