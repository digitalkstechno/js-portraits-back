import express from "express";
import {
  getPrintSettings,
  updatePrintSettings,
} from "../controllers/printSettings.js";
const router = express.Router();

router.get("/", getPrintSettings);
router.post("/", updatePrintSettings);

export default router;
