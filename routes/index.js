import express from "express";
const router = express.Router();

import authRoute from "./auth.js";
import staffRoutes from "./staff.js";
import roleRoutes from "./role.js";

router.use("/admin", authRoute);
router.use("/staff", staffRoutes);
router.use("/role", roleRoutes);

export default router;