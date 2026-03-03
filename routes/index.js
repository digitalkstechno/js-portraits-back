import express from "express";
const router = express.Router();

import authRoute from "./auth.js";
import staffRoutes from "./staff.js";
import roleRoutes from "./role.js";
import itemRoutes from "./itemMaster.js";
import productRoutes from "./products.js";

router.use("/admin", authRoute);
router.use("/staff", staffRoutes);
router.use("/role", roleRoutes);
router.use("/items", itemRoutes);
router.use("/products", productRoutes);

export default router;
