import express from "express";
import { getPendingAmountsSummary } from "../controllers/pendingSummary.js";
const router = express.Router();

router.get("/", getPendingAmountsSummary);

export default router;