import { AppVersion, PrismaClient } from "@prisma/client";
import { JSONendpointWQuery } from "../../../utils/routes";
import { getVersionDto, getVersionDtoSchema } from "./input.dto";

const prisma = new PrismaClient();

export const getAppVersions = JSONendpointWQuery<AppVersion[], getVersionDto>(
  getVersionDtoSchema,
  async ({ params }) => {
    let filter = { where: {} };
    if (params?.id) {
      filter.where = { id: params.id };
    }
    const appVersions = await prisma.appVersion.findMany(filter);
    return appVersions;
  }
);
