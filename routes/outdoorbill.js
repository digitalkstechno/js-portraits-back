import express from "express";
import {
  createOutdoorBill,
  fetchBillByParty,
  fetchOutdoorBills,
  fetchOutdoorBillsCount,
} from "../controllers/outdoorbill.js";
const router = express.Router();

router.get("/count", fetchOutdoorBillsCount);
router.post("/", createOutdoorBill);
router.get("/", fetchOutdoorBills);
router.get("/:id", fetchBillByParty);

export default router;
