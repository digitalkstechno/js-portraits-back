import express from "express";
const router = express.Router();

import authRoute from "./auth.js";
import staffRoutes from "./staff.js";
import roleRoutes from "./role.js";
import itemRoutes from "./itemMaster.js";
import productRoutes from "./products.js";
import quotationRoutes from "./quotation.js";
import outdoorOrderRoutes from "./order.js";
import outdoorbill from "./outdoorbill.js";
import staffSalaryRoutes from "./staffSalary.js";

router.use("/admin", authRoute);
router.use("/staff", staffRoutes);
router.use("/staffSalary", staffSalaryRoutes);
router.use("/role", roleRoutes);
router.use("/items", itemRoutes);
router.use("/products", productRoutes);
router.use("/quotation", quotationRoutes);
router.use("/order", outdoorOrderRoutes);
router.use("/outdoorbill", outdoorbill);

export default router;
