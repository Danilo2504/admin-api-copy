import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface GetAllUsersQuery {
  page?: string;
  pageSize?: string;
  search?: string;
}

const isUUID = (value: string): boolean => {
  // Simple regex for UUID format (8-4-4-4-12 characters)
  const uuidRegex =
    /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
  return uuidRegex.test(value);
};

export const getAllUsers = async (
  req: Request<{}, {}, {}, GetAllUsersQuery>,
  res: Response
) => {
  try {
    const { page = "1", pageSize = "50", search } = req.query;

    let users;

    if (search && isUUID(search)) {
      // If it matches the UUID format, search directly by ID
      const user = await prisma.user.findUnique({
        where: {
          id: search,
        },
        select: {
          id: true,
          email: true,
          deletedAt: true,
          Account: {
            select: {
              name: true,
              country: true,
              cellPhone: true,
              countryCode: true,
            },
          },
        },
      });

      users = user ? [user] : [];
    } else {
      // Use the existing logic for other cases
      users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          deletedAt: true,
          Account: {
            select: {
              name: true,
              country: true,
              cellPhone: true,
              countryCode: true,
            },
          },
        },
        where: {
          OR: [
            {
              Account: {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
            {
              Account: {
                cellPhone: {
                  contains: search,
                },
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        },
        skip: (+page - 1) * +pageSize,
        take: +pageSize,
      });
    }

    const formattedUsers = users
      .filter((user) => !user?.deletedAt)
      .map((user) => ({
        id: user?.id,
        email: user?.email,
        fullName: user?.Account?.name,
        countryCode: user?.Account?.countryCode,
        cellPhone: user?.Account?.cellPhone,
        country: user?.Account?.country,
      }));
    res.status(200).json(formattedUsers);
  } catch (error) {
    res.status(500).json(error);
  }
};
