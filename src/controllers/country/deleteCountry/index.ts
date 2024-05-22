import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const deleteCountry = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const country = await prisma.country.delete({ where: { id } });
    if (!country.name) return res.status(400).json("Country not found!");
    res.json("Country has been deleted");
  } catch (error) {
    console.log(error);
  }
};
