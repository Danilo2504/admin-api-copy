import { generateSchema } from "@anatine/zod-openapi";
import { AppStatus } from "@prisma/client";
import * as z from "zod";

export const UpdateVersionSchema = z.object({
  version: z.string(),
  releaseDate: z.string(),
  description: z.string(),
  available: z.boolean(),
  status: z.nativeEnum(AppStatus),
  message: z.string(),
});

export const UpdateVersion = generateSchema(UpdateVersionSchema);

export type UpdateVersionInputBodyDto = z.infer<typeof UpdateVersionSchema>;
