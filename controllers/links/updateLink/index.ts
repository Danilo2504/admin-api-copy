import { PrismaClient } from "@prisma/client";
import { LinkSchema, LinkInputBodyDto } from "./input.dto";
import { parseBodySchema } from "../../../guards/zodSchemaValidator";
import { JSONendpointWGuards } from "../../../utils/routes";

const prisma = new PrismaClient();

type LinkInputData = {
  body: LinkInputBodyDto;
};

export const updateLink = JSONendpointWGuards<LinkInputData, unknown>(
  [parseBodySchema(LinkSchema)],
  async (req, { body }) => {
    const updatedLink = await prisma.link.update({
      where: { id: req.params.id },
      data: body,
    });
    return updatedLink;
  }
);
