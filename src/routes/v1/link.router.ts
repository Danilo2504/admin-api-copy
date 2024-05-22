import { Router } from "express";
import linkController from "../../controllers/links";

const router = Router();

router.get("/link", linkController.getlinks);
router.get("/link/:id", linkController.getlinks);
router.post("/link", linkController.createLink);
router.put("/link/:id", linkController.updateLink);
router.delete("/link/:id", linkController.deleteLink);

export default router;
