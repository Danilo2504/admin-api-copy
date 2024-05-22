import { Router } from "express";
import appVersionController from "../../controllers/appVersion";

const router = Router();

router.get("/version", appVersionController.getAppVersions);
router.get("/version/:id", appVersionController.getAppVersions);
router.post("/version", appVersionController.createAppVersion);
router.put("/version/:id", appVersionController.updateAppVersion);
router.delete("/version/:id", appVersionController.deleteVersion);

export default router;
