import { PrismaClient } from "@prisma/client";
import { CustomRequest } from "../../../middleware/verifyJWT";
import { DeleteUserInputBodyDto, DeleteUserSchema } from "./input.dto";
import { JSONendpointWGuards } from "../../../utils/routes";
import { parseBodySchema } from "../../../guards/zodSchemaValidator";

type DeleteUserInputData = {
  body: DeleteUserInputBodyDto;
};

const prisma = new PrismaClient();

export const deleteUsers = JSONendpointWGuards<DeleteUserInputData, string>(
  [parseBodySchema(DeleteUserSchema)],
  async (req: CustomRequest) => {
    const { ids } = req.body;
    const adminRole = req.role;

    if (adminRole !== "SUPER_ADMIN") {
      return "Only Super Admin can delete users!";
    }

    const updateManyObject = {
      where: { ownerId: { in: ids }, deletedAt: null },
      data: { deletedAt: new Date() },
    };

    const [users] = await Promise.all([
      prisma.user.updateMany({
        where: { id: { in: ids }, deletedAt: null },
        data: updateManyObject.data,
      }),
      prisma.userAccount.updateMany(updateManyObject),
      prisma.business.updateMany(updateManyObject),
      prisma.financialAccount.updateMany(updateManyObject),
      prisma.transaction.updateMany(updateManyObject),
      prisma.debt.updateMany(updateManyObject),
      prisma.contact.updateMany(updateManyObject),
    ]);

    if (!users.count) {
      return "No users found, may have been deleted already or does not exist!";
    }
    return `Number of users deleted: ${users.count}`;
  }
);
