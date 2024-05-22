import { generateSchema } from "@anatine/zod-openapi";
import * as z from "zod";

export const DeleteUserSchema = z.object({
  ids: z
    .array(z.string().uuid())
    .min(1, "No user ids were provided for deleting!"),
});

export const DeleteUser = generateSchema(DeleteUserSchema);

export type DeleteUserInputBodyDto = z.infer<typeof DeleteUserSchema>;
