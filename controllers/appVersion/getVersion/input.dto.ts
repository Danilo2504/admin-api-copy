import { z } from "zod";

export const getVersionDtoSchema = z.object({});

export type getVersionDto = z.infer<typeof getVersionDtoSchema>;
