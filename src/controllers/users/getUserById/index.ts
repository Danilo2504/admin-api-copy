import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findFirst({
      where: { id: id },
      select: {
        id: true,
        email: true,
        Account: {
          select: {
            name: true,
            countryCode: true,
            cellPhone: true,
            country: true,
          },
        },
      },
    });

    const formattedUser = {
      id: user?.id,
      email: user?.email,
      fullName: user?.Account ? user?.Account?.name : null,
      countryCode: user?.Account ? user?.Account?.countryCode : null,
      cellPhone: user?.Account ? user?.Account?.cellPhone : null,
      country: user?.Account ? user?.Account?.country : null,
    };

    res.status(200).json(formattedUser);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
