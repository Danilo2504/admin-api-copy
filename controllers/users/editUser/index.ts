import { PrismaClient } from "@prisma/client";
import { EditUserSchema, editUserInputBodyDto } from "./input.dto";
import { parseBodySchema } from "../../../guards/zodSchemaValidator";
import { JSONendpointWGuards } from "../../../utils/routes";

const prisma = new PrismaClient();

type editUserInputData = {
  body: editUserInputBodyDto;
};

export const editUser = JSONendpointWGuards<editUserInputData, any>(
  [parseBodySchema(EditUserSchema)],
  async (req, { body }) => {
    const userId = req.params.userId;
    const { email, accountData } = body;

    const [updatedUserEmail, updatedUserAccount] = await Promise.all([
      prisma.user.update({
        where: { id: userId },
        data: { email },
      }),
      prisma.userAccount.update({
        where: { ownerId: userId },
        data: accountData,
      }),
    ]);

    return { ...updatedUserEmail, ...updatedUserAccount };
  }
);
