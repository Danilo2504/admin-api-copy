import { Router } from "express";
import countryController from "../../controllers/country";

const router = Router();

router.get("/country", countryController.getCountries);
router.get("/country/:id", countryController.getCountries);
router.post("/country", countryController.createCountry);
router.put("/country/:id", countryController.updateCountry);
router.delete("/country/:id", countryController.deleteCountry);

export default router;
