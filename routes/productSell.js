import express from "express";
import {
  createproductSell,
  getallProductSell,
  getProductSellCount,
} from "../controllers/productSell.js";
const router = express.Router();

// Same endpoint structure you'd use for Outdoor Bills
router.get("/count", getProductSellCount);
router.post("/", createproductSell);
router.get("/", getallProductSell);

export default router;