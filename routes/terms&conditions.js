import express from "express";
import {
  getTermsHandler,
  saveTermsHandler,
} from "../controllers/terms&conditions.js";
const router = express.Router();

router.get("/", getTermsHandler);
router.post("/", saveTermsHandler);

export default router;
