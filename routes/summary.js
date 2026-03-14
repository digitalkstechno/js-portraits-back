import express from "express";
import { getFinancialSummary } from "../controllers/summary.js";
const router = express.Router();

router.get("/", getFinancialSummary);

export default router;