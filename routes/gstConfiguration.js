import express from "express";
import {
  getConfiguration,
  updateGstSettings,
} from "../controllers/gstConfiguration.js";
const router = express.Router();

router.get("/", getConfiguration);
router.post("/", updateGstSettings);

export default router;
