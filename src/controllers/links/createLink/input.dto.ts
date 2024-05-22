import { generateSchema } from "@anatine/zod-openapi";
import * as z from "zod";

export const LinkSchema = z.object({
  url: z.string().url(),
  name: z.string().min(3, "Can not be empty"),
});

export const Link = generateSchema(LinkSchema);

export type LinkInputBodyDto = z.infer<typeof LinkSchema>;
