import { PrismaClient } from "@prisma/client";
import { CountrySchema, CountryInputBodyDto } from "./input.dto";
import { parseBodySchema } from "../../../guards/zodSchemaValidator";
import { JSONendpointWGuards } from "../../../utils/routes";

const prisma = new PrismaClient();

type CountryInputData = {
  body: CountryInputBodyDto;
};

export const createCountry = JSONendpointWGuards<CountryInputData, unknown>(
  [parseBodySchema(CountrySchema)],
  async (_req, { body }) => {
    const newCountry = await prisma.country.create({
      data: body,
    });
    return newCountry;
  }
);
