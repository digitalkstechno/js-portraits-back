import express from "express";
import {
  createOutdoorBill,
  fetchOutdoorBills,
} from "../controllers/outdoorbill.js";
const router = express.Router();

router.post("/", createOutdoorBill);

router.get("/", fetchOutdoorBills);

export default router;
