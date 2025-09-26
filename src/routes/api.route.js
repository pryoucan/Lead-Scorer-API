import { Router } from "express";
import multer from "multer";
import offerController from "../controllers/offer.controller.js";
import leadController from "../controllers/lead.controller.js";
import scoreController from "../controllers/score.controller.js";
import storage from "../storage.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// end-point for offers
router.post("/offer", offerController); 
// end-point for uploading csv/txt with multer middleware of lead's info
router.post("/leads/upload", upload.single("leadsFile"), leadController); 
// computing scores
router.post("/score", scoreController);  
 // retrieving results
router.get("/results", (req, res) => {  
  res.status(200).json(storage.results);
});

export default router;