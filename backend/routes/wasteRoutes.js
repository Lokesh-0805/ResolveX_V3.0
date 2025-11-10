import express from "express";
import multer from "multer";
import { createWasteReport } from "../controllers/wasteController.js";

const router = express.Router();

// File storage setup
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// POST /api/waste
router.post("/", upload.array("media"), createWasteReport);

export default router;
