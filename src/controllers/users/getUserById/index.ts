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
        UserAccount: {
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
      fullName: user?.UserAccount ? user?.UserAccount?.name : null,
      countryCode: user?.UserAccount ? user?.UserAccount?.countryCode : null,
      cellPhone: user?.UserAccount ? user?.UserAccount?.cellPhone : null,
      country: user?.UserAccount ? user?.UserAccount?.country : null,
    };

    res.status(200).json(formattedUser);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
