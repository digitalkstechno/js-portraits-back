import express from "express";
import { paginationMiddleware } from "../middleware/pagination.js";
import Quotation from "../models/quotation.js";
import {
  createQuotationHandler,
  deleteQuotationHandler,
  getQuotationByIdHandler,
  getQuotationByQuotationHandler,
  getQuotationCount,
  getQuotationsHandler,
  updateQuotationHandler,
} from "../controllers/quotation.js";
const router = express.Router();

router.get("/count", getQuotationCount);
router.get(
  "/",
  paginationMiddleware(Quotation, {
    populate: { path: "packageId" },
  }),
  getQuotationsHandler,
);
router.get("/:quotationNo", getQuotationByQuotationHandler);
router.post("/", createQuotationHandler);
router.get("/:id", getQuotationByIdHandler);
router.put("/:id", updateQuotationHandler);
router.delete("/:id", deleteQuotationHandler);

export default router;
