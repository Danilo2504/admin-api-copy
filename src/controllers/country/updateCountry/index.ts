import { PrismaClient } from "@prisma/client";
import { CountrySchema, CountryInputBodyDto } from "./input.dto";
import { parseBodySchema } from "../../../guards/zodSchemaValidator";
import { JSONendpointWGuards } from "../../../utils/routes";

const prisma = new PrismaClient();

type CountryInputData = {
  body: CountryInputBodyDto;
};

export const updateCountry = JSONendpointWGuards<CountryInputData, unknown>(
  [parseBodySchema(CountrySchema)],
  async (req, { body }) => {
    const updatedCountry = await prisma.country.update({
      where: { id: req.params.id },
      data: body,
    });

    if (!updatedCountry) return "Country not found!";

    return updatedCountry;
  }
);
