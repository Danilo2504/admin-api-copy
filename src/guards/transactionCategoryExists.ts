import { Guard } from "../utils/routes";
import { TransactionCategory } from "@prisma/client";
import { prisma } from "../db";
import { BadRequestException } from "../exceptions/bad-request";
const { transactionCategory: TransactionCategory } = prisma;

interface expenseCategoryExistsData {
  transactionCategory: TransactionCategory;
}

export const expenseCategoryExists: (
  id: string
) => Guard<expenseCategoryExistsData> = (categoryId) => async (pipedData) => {
  const category = await TransactionCategory.findFirst({
    where: {
      id: categoryId,
    },
  });

  if (!category)
    throw new BadRequestException(
      `Transaction Category with id ${categoryId} does not exist`
    );
  pipedData.transactionCategory = category;
};
