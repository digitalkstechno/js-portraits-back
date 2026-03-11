import express from "express";
import {
  createOutdoorOrderHandler,
  getAllOrders,
  getOrderByQuotationHandler,
  getOrdersCount,
} from "../controllers/order.js";
const router = express.Router();

router.get("/", getAllOrders);
router.post("/", createOutdoorOrderHandler);
router.get("/count", getOrdersCount);
router.get("/:quotationNo", getOrderByQuotationHandler);

export default router;
