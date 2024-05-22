import { Guard } from "../utils/routes";
import { Transaction } from "@prisma/client";
import { prisma } from "../db";
import { NotFoundException } from "../exceptions/not-found";
const { transaction: Transaction } = prisma;

interface TransactionExistsData {
  transaction: Transaction;
}

export const transactionExists: (
  userId: string
) => Guard<TransactionExistsData> = (userId) => async (pipedData, req) => {
  const { id } = req.params;

  const transaction = await Transaction.findFirst({
    where: {
      id,
      ownerId: userId,
    },
  });

  if (!transaction) throw new NotFoundException();
  pipedData.transaction = transaction;
};
