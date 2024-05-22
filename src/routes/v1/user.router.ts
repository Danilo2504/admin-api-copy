import { Router } from "express";
import userController from "../../controllers/users";

const router = Router();

router.get("/users", userController.getAllUsers);
router.get("/getNewUsersStats", userController.getNewUsersStats);
router.get("/getUsersStats", userController.getUsersStats);
router.get("/getUsersAmountCountry", userController.getUsersAmountCountry);
router.get("/getUserById/:id", userController.getUserById);
router.get(
  "/user/transaction-summary/:id",
  userController.getUserTransactionSummary
);
router.put("/editUser/:userId", userController.editUser);
router.delete("/users/delete-multiple", userController.deleteUsers);

export default router;
