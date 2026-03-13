import express from "express";
import {
  fetchPurchases,
  getProductPurchaseCount,
  savePurchase,
} from "../controllers/productPurchase.js";
const router = express.Router();

router.get("/count", getProductPurchaseCount);
router.post("/", savePurchase);
router.get("/", fetchPurchases);

export default router;
