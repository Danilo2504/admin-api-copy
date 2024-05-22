import { createAppVersion } from "./createVersion";
import { getAppVersions } from "./getVersion";
import { updateAppVersion } from "./upadateVersion";
import { deleteVersion } from "./deleteVersion";

const appVersionController = {
  createAppVersion,
  getAppVersions,
  updateAppVersion,
  deleteVersion,
};

export default appVersionController;
