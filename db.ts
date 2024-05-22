import { Prisma, PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model === "Transaction" || params.model === "Contact") {
    const action = params.action;
    const findActions: Prisma.PrismaAction[] = [
      "findFirst",
      "findMany",
      "findUnique",
    ];
    if (findActions.some((el) => el === action)) {
      const filter: Prisma.TransactionWhereInput["deletedAt"] = null;
      params.args.where["deletedAt"] = filter;
    }
  }
  return next(params);
});
