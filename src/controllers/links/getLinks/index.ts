import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getlinks = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (id) {
      const link = await prisma.link.findUnique({ where: { id } });
      return res.json(link);
    }
    const allLinks = await prisma.link.findMany();
    res.json(allLinks);
  } catch (error) {
    console.log(error);
  }
};
