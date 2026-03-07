import express from "express";
import {
  createPayment,
  getStaffSalaryStats,
  getStaffsHistory,
  getStaffsSalaries,
  removePayment,
} from "../controllers/staffSalary.js";
const router = express.Router();

router.get("/:staffId", getStaffsHistory);
router.post("/", createPayment);
router.get("/", getStaffsSalaries);
router.get("/stats/:staffId", getStaffSalaryStats);
router.delete("/:id", removePayment);

export default router;
