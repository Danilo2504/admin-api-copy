import { generateSchema } from "@anatine/zod-openapi";
import { AppStatus } from "@prisma/client";
import * as z from "zod";

export const CreateVersionSchema = z.object({
  version: z.string(),
  releaseDate: z.string(),
  description: z.string(),
  available: z.boolean(),
  status: z.nativeEnum(AppStatus),
  message: z.string(),
});

export const CreateVersion = generateSchema(CreateVersionSchema);

export type CreateVersionInputBodyDto = z.infer<typeof CreateVersionSchema>;
