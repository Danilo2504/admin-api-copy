import { PrismaClient } from "@prisma/client";
import { LinkSchema, LinkInputBodyDto } from "./input.dto";
import { parseBodySchema } from "../../../guards/zodSchemaValidator";
import { JSONendpointWGuards } from "../../../utils/routes";

const prisma = new PrismaClient();

type LinkInputData = {
  body: LinkInputBodyDto;
};

export const createLink = JSONendpointWGuards<LinkInputData, unknown>(
  [parseBodySchema(LinkSchema)],
  async (_req, { body }) => {
    const newLink = await prisma.link.create({
      data: body,
    });
    return newLink;
  }
);
