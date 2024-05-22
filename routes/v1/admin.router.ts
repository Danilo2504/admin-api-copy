import { Router } from "express";
import AdminController from "../../controllers/admin";

const router = Router();

router.post("/adminSignUp", AdminController.adminSignUp);

router.post("/adminSignIn", AdminController.adminSignIn);

export default router;
