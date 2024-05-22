import { Guard } from "../utils/routes";
import { Contact } from "@prisma/client";
import { prisma } from "../db";
import { BadRequestException } from "../exceptions/bad-request";
const { contact: Contact } = prisma;

interface contactExistsData {
  contact: Contact;
}

export const contactsExists: (id: string) => Guard<contactExistsData> =
  (contactId) => async (pipedData) => {
    const contact = await Contact.findFirst({
      where: {
        id: contactId
      }
    });

    if (!contact)
      throw new BadRequestException(
        `Contact with id ${contactId} does not exist`
      );
    pipedData.contact = contact;
  };
