import { generateSchema } from "@anatine/zod-openapi";
import * as z from "zod";

export const LinkSchema = z.object({
  url: z.string().url().optional(),
  name: z.string().optional(),
});

export const Link = generateSchema(LinkSchema);

export type LinkInputBodyDto = z.infer<typeof LinkSchema>;
