import { BadRequestException } from "../exceptions/bad-request";
import { User as UserModel } from "@prisma/client";
import { Guard } from "../utils/routes";

type Data = {
  user: UserModel;
};

/**
 * alters the `.user` field
 */
export const setUser: Guard<Data> = (data, req) => {
  //@ts-ignore
  if (!req.user) throw new BadRequestException("No user");
  //@ts-ignore
  data.user = req.user as UserModel;
};
