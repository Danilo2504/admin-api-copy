import { generateSchema } from "@anatine/zod-openapi";
import * as z from "zod";

export const SignInSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const SignIn = generateSchema(SignInSchema);

export type signInInputBodyDto = z.infer<typeof SignInSchema>;
