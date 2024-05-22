import { PrismaClient } from "@prisma/client";
import { CreateVersionInputBodyDto, CreateVersionSchema } from "./input.dto";
import { parseBodySchema } from "../../../guards/zodSchemaValidator";
import { JSONendpointWGuards } from "../../../utils/routes";

interface CreateVersion {
  body: CreateVersionInputBodyDto;
}

const prisma = new PrismaClient();

export const createAppVersion = JSONendpointWGuards<
  CreateVersion,
  CreateVersionInputBodyDto
>([parseBodySchema(CreateVersionSchema)], async (req) => {
  const appVersion = await prisma.appVersion.create({
    data: req.body,
  });

  return appVersion;
});
