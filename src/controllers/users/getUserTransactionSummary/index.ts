import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

type TransactionSummary = {
  [monthYear: string]: {
    income: number;
    expense: number;
  };
};

export const getUserTransactionSummary = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const transactions = await prisma.transaction.findMany({
      where: { ownerId: id, status: { not: "DEBT" } },
      select: {
        type: true,
        date: true,
      },
    });

    // Process transactions to group by month and calculate counts
    const summary: TransactionSummary = transactions.reduce(
      (acc, transaction) => {
        const date = new Date(transaction.date);
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        const monthYear = `${month} ${year}`;

        if (!acc[monthYear]) {
          acc[monthYear] = { income: 0, expense: 0 };
        }

        if (transaction.type === "CREDIT") {
          acc[monthYear].income += 1;
        } else if (transaction.type === "DEBIT") {
          acc[monthYear].expense += 1;
        }

        return acc;
      },
      {} as TransactionSummary
    );

    const formattedSummary = Object.keys(summary).map((monthYear) => ({
      month: monthYear,
      income: summary[monthYear].income,
      expense: summary[monthYear].expense,
    }));

    res.json(formattedSummary);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
