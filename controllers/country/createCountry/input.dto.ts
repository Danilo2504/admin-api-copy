import { generateSchema } from "@anatine/zod-openapi";
import * as z from "zod";

export const CountrySchema = z.object({
  name: z.string().min(3, "Can not be empty"),
  isoCode: z.string().min(3, "Can not be empty"),
});

export const Country = generateSchema(CountrySchema);

export type CountryInputBodyDto = z.infer<typeof CountrySchema>;
