import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUsersAmountCountry = async (_req: Request, res: Response) => {
    try {
        const result = await prisma.userAccount.groupBy({
            by: ["country"],
            _count: true,
            orderBy: {
                _count: { country: "desc" },
            },
            take: 10,
        });
        // Add position to each item in the result
        const resultWithPosition = result.map((item, index) => ({
            ...item,
            position: index + 1,
        }));

        res.json(resultWithPosition);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
