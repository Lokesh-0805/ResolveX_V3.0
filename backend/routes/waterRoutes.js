import express from "express";
import { notifyAuthorities,createWaterReport } from "../controllers/waterController.js";

const router = express.Router();

// POST /api/water
router.post("/", createWaterReport);
router.post("/notify", notifyAuthorities);

export default router;
