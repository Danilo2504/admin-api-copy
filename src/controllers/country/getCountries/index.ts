import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getCountries = async (req: Request, res: Response) => {
  const { name, isoCode } = req.query;
  const { id } = req.params;
  try {
    if (id) {
      const country = await prisma.country.findUnique({ where: { id } });
      return res.json(country);
    }

    const filter = { where: {} };
    if (name) filter.where = { name };
    if (isoCode) filter.where = { isoCode };

    const allCountries = await prisma.country.findMany(filter);
    res.json(allCountries);
  } catch (error) {
    console.log(error);
  }
};
