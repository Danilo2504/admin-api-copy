import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const deleteLink = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.link.delete({ where: { id } });
    res.json("Link has been deleted");
  } catch (error) {
    console.log(error);
  }
};
