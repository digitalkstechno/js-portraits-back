import express from "express";
import {
  createOutdoorOrderHandler,
  getOrderByQuotationHandler,
} from "../controllers/order.js";
const router = express.Router();

router.post("/", createOutdoorOrderHandler);

router.get("/:quotationNo", getOrderByQuotationHandler);

export default router;