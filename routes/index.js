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
import noteSettingsRoutes from "./noteSettings.js";
import outdoorBookMasterRoutes from "./outdoorBookMaster.js";
import customerRoutes from "./customer.js";
import termsConditionsRoutes from "./terms&conditions.js";
import productSellRoutes from "./productSell.js";

router.use("/admin", authRoute);
router.use("/staff", staffRoutes);
router.use("/staffSalary", staffSalaryRoutes);
router.use("/role", roleRoutes);
router.use("/items", itemRoutes);
router.use("/products", productRoutes);
router.use("/quotation", quotationRoutes);
router.use("/order", outdoorOrderRoutes);
router.use("/outdoorbill", outdoorbill);
router.use("/noteSettings", noteSettingsRoutes);
router.use("/outdoorBookMaster", outdoorBookMasterRoutes);
router.use("/outdoorParty", customerRoutes);
router.use("/termsAndConditions", termsConditionsRoutes);
router.use("/productSell", productSellRoutes);

export default router;
