import express from "express";
import {
  createPayment,
  getStaffSalaryStats,
  getStaffsHistory,
  removePayment,
} from "../controllers/staffSalary.js";
const router = express.Router();

router.get("/:id", getStaffsHistory);
router.post("/", createPayment);
router.get("/stats/:id", getStaffSalaryStats);
router.delete("/:id", removePayment);

export default router;
