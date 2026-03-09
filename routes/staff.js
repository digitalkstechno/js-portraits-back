import express from "express";
import {
  createStaffHandler,
  deleteStaffHandler,
  getStaffByIdHandler,
  getStaffCount,
  getStaffHandler,
  updateStaffHandler,
} from "../controllers/staff.js";
import { paginationMiddleware } from "../middleware/pagination.js";
import Staff from "../models/staff.js";
const router = express.Router();

router.get("/count", getStaffCount);
router.get("/", paginationMiddleware(Staff), getStaffHandler);
router.post("/", createStaffHandler);
router.get("/:id", getStaffByIdHandler);
router.put("/:id", updateStaffHandler);
router.delete("/:id", deleteStaffHandler);

export default router;
