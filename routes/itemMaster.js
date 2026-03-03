import express from "express";
import { paginationMiddleware } from "../middleware/pagination.js";
import Item from "../models/master/items.js";
import {
  createItemHandler,
  deleteItemHandler,
  getItemByIdHandler,
  getItemsHandler,
  updateItemHandler,
} from "../controllers/itemMaster.js";
const router = express.Router();

router.get("/", paginationMiddleware(Item), getItemsHandler);
router.post("/", createItemHandler);
router.get("/:id", getItemByIdHandler);
router.put("/:id", updateItemHandler);
router.delete("/:id", deleteItemHandler);

export default router;
