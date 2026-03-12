import express from "express";
import {
  deletePayment,
  getAllPayment,
  getPaymentByParty,
  savePayment,
} from "../controllers/outdoorPartyPayment.js";
const router = express.Router();

router.get("/", getAllPayment);
router.post("/", savePayment);
router.get("/:id", getPaymentByParty);
router.delete("/:id", deletePayment);

export default router;
