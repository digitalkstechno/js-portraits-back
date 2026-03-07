import express from "express";
import {
  createOutdoorOrderHandler,
  getOrderByQuotationHandler,
  getOrdersCount,
} from "../controllers/order.js";
const router = express.Router();

router.post("/", createOutdoorOrderHandler);
router.get("/count", getOrdersCount);
router.get("/:quotationNo", getOrderByQuotationHandler);

export default router;
