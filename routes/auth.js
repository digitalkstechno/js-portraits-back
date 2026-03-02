import express from "express";
import { loginAdminHandler } from "../controllers/auth.js";

const router = express.Router();

router.post("/", loginAdminHandler);

export default router;