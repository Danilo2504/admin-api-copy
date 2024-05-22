import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const deleteVersion = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.appVersion.delete({ where: { id } });
    res.json("Version has been deleted");
  } catch (error) {
    console.log(error);
  }
};
