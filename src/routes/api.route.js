import { Router } from "express";
import multer from "multer";
import offerController from "../controllers/offer.controller.js";
import leadController from "../controllers/lead.controller.js";
import scoreController from "../controllers/score.controller.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/offer", offerController);
router.post("/leads/upload", upload.single("leadsFile"), leadController);
router.post("/score", scoreController);
router.get("/results", (req, res) => {
  res.status(200).json(storage.results);
});

export default router;