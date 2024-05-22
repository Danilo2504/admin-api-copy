import { AdminRole } from "@prisma/client";

export type signInResponseDto = {
  id: string;
  email: string;
  token: string;
  role: AdminRole;
};
