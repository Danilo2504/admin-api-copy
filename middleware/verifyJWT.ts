import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

export interface CustomRequest extends Request {
  email?: string;
  role?: string;
  adminId?: string;
}

export default async function jwtVerify(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.header("Authorization");

  if (!authHeader?.startsWith("Bearer")) {
    return res.status(401).json("No token, authorization denied");
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (decoded) {
      const admin = await prisma.adminAccount.findUnique({
        where: { id: decoded.id },
      });

      if (admin) {
        req.adminId = admin.id;
        req.role = admin.adminRole.toString();
        req.email = admin.email;
        next();
      } else {
        res.status(401).json("No user with this id");
      }
    } else {
      res.status(401).json("Invalid token or expired");
    }
  } catch (err) {
    res.status(401).json(err);
  }
}
