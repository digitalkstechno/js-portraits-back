import express from "express";
import { paginationMiddleware } from "../middleware/pagination.js";
import ProductDetails from "../models/products.js";
import {
  createProductHandler,
  deleteProductHandler,
  getProductByIdHandler,
  getProductsByItem,
  getProductsHandler,
  updateProductHandler,
} from "../controllers/products.js";
const router = express.Router();

router.get(
  "/",
  paginationMiddleware(ProductDetails, {
    populate: { path: "item_name" },
  }),
  getProductsHandler,
);
router.post("/", createProductHandler);
router.get("/:id", getProductByIdHandler);
router.get("/item/:itemId", getProductsByItem);
router.put("/:id", updateProductHandler);
router.delete("/:id", deleteProductHandler);

export default router;
