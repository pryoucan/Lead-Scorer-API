import { Router } from "express";
import offerController from "../controllers/offer.controller";

const router = Router();

router.post('/offer', offerController)
router.post('/leader/upload')
router.post('score')
router.get('/results')