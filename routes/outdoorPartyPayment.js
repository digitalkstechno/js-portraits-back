import express from "express";
import {
  deletePayment,
  getAllPayment,
  getPaymentByParty,
  getPaymentCount,
  savePayment,
} from "../controllers/outdoorPartyPayment.js";
const router = express.Router();

router.get("/count", getPaymentCount);
router.get("/", getAllPayment);
router.post("/", savePayment);
router.get("/:id", getPaymentByParty);
router.delete("/:id", deletePayment);

export default router;
