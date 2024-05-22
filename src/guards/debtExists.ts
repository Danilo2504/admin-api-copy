import { Guard } from "../utils/routes";
import { Debt } from "@prisma/client";
import { prisma } from "../db";
import { NotFoundException } from "../exceptions/not-found";
const { debt: Debt } = prisma;

interface DebtExistsData {
    debt: Debt
}

export const debtExists: (
    userId: string
) => Guard<DebtExistsData> = (userId) => async (pipedData, req) => {
    const { id } = req.params;

    const debt = await Debt.findFirst({
        where: {
            id,
            ownerId: userId,
        },
    });

    if (!debt) throw new NotFoundException();
    pipedData.debt = debt;
};
