import { getUsersStats } from "./getUsersStats/index";
import { getAllUsers } from "./getAllUsers";
import { getUserById } from "./getUserById/index";
import { getNewUsersStats } from "./getNewUsersCount";
import { getUsersAmountCountry } from "./getusersAmountCountry";
import { editUser } from "./editUser";
import { deleteUsers } from "./deleteUser";
import { getUserTransactionSummary } from "./getUserTransactionSummary";

const usersController = {
  getAllUsers,
  getUserById,
  getNewUsersStats,
  getUsersStats,
  getUsersAmountCountry,
  editUser,
  deleteUsers,
  getUserTransactionSummary,
};

export default usersController;
