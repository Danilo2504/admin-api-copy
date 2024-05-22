import { PrismaClient } from "@prisma/client";
import { UpdateVersionInputBodyDto, UpdateVersionSchema } from "./input.dto";
import { parseBodySchema } from "../../../guards/zodSchemaValidator";
import { JSONendpointWGuards } from "../../../utils/routes";

interface UpdateVersion {
  body: UpdateVersionInputBodyDto;
}

const prisma = new PrismaClient();

export const updateAppVersion = JSONendpointWGuards<
  UpdateVersion,
  UpdateVersionInputBodyDto
>([parseBodySchema(UpdateVersionSchema)], async (req) => {
  const { id } = req.params;
  const appVersion = await prisma.appVersion.update({
    where: { id },
    data: req.body,
  });

  return appVersion;
});
