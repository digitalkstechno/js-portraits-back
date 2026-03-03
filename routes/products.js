import express from "express";
import { paginationMiddleware } from "../middleware/pagination.js";
import ProductDetails from "../models/products.js";
import {
  createProductHandler,
  deleteProductHandler,
  getProductByIdHandler,
  getProductsHandler,
  updateProductHandler,
} from "../controllers/products.js";
const router = express.Router();

router.get("/", paginationMiddleware(ProductDetails), getProductsHandler);
router.post("/", createProductHandler);
router.get("/:id", getProductByIdHandler);
router.put("/:id", updateProductHandler);
router.delete("/:id", deleteProductHandler);

export default router;
