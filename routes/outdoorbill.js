import express from "express";
import {
  createOutdoorBill,
  fetchOutdoorBills,
  fetchOutdoorBillsCount,
} from "../controllers/outdoorbill.js";
const router = express.Router();

router.get("/count", fetchOutdoorBillsCount);
router.post("/", createOutdoorBill);
router.get("/", fetchOutdoorBills);

export default router;
