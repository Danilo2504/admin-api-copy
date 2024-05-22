import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

export const getUsersStats = async (_: Request, res: Response) => {
  try {
    const startOfMonth = moment().startOf("month");
    const endOfMonth = moment().endOf("month");

    const totalUsers = await prisma.user.count();

    const monthlyUsers = await prisma.user.count({
      where: {
        OR: [
          {
            Transaction: {
              some: {
                createdAt: {
                  gte: startOfMonth.toDate(),
                  lte: endOfMonth.toDate(),
                },
              },
            },
          },
          {
            Debt: {
              some: {
                createdAt: {
                  gte: startOfMonth.toDate(),
                  lte: endOfMonth.toDate(),
                },
              },
            },
          },
        ],
      },
    });

    res.status(200).json({
      totalUsers: totalUsers,
      activeUsers: monthlyUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
