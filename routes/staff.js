import express from "express";
import {
  createStaffHandler,
  deleteStaffHandler,
  getStaffByIdHandler,
  getStaffHandler,
  updateStaffHandler,
} from "../controllers/staff.js";
const router = express.Router();

router.get("/", getStaffHandler);
router.post("/", createStaffHandler);
router.get("/:id", getStaffByIdHandler);
router.put("/:id", updateStaffHandler);
router.delete("/:id", deleteStaffHandler);

export default router;
