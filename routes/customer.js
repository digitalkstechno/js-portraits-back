import express from "express";
import {
  createCustomerHandler,
  getCustomerHandler,
  updateCustomerHandler,
} from "../controllers/customer.js";
const router = express.Router();

router.get("/", getCustomerHandler);
router.post("/", createCustomerHandler);
router.put("/:id", updateCustomerHandler);

export default router;