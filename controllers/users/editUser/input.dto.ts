import { generateSchema } from "@anatine/zod-openapi";
import * as z from "zod";

const AccountDataSchema = z.object({
  name: z.string().optional(),
  cellPhone: z.string().optional(),
  country: z.string().optional(),
  countryCode: z.string().optional(),
  currencyCountry: z.string().optional(),
  image: z.string().optional(),
  address: z.string().optional(),
});

export const EditUserSchema = z.object({
  email: z.string().email().optional(),
  accountData: AccountDataSchema,
});

export const EditUser = generateSchema(EditUserSchema);

export type editUserInputBodyDto = z.infer<typeof EditUserSchema>;
