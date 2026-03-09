import express from "express";
import {
  createBookHandler,
  deleteBookHandler,
  getBooksHandler,
  updateBookHandler,
} from "../controllers/outdoorBookMaster.js";
const router = express.Router();

router.get("/", getBooksHandler);
router.post("/", createBookHandler);
router.put("/:id", updateBookHandler);
router.delete("/:id", deleteBookHandler);

export default router;
