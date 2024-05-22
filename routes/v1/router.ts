import { Router } from "express";
import jwtVerify from "../../middleware/verifyJWT";
import authRouter from "./admin.router";
import userRouter from "./user.router";
import linkRouter from "./link.router";
import countryRouter from "./country.router";

const router = Router();

router.use("/v1", authRouter, jwtVerify, userRouter, linkRouter, countryRouter);

export default router;
