import express from "express";
import { paginationMiddleware } from "../middleware/pagination.js";
import {
  createRoleHandler,
  deleteRoleHandler,
  getRoleByIdHandler,
  getRolesHandler,
  updateRoleHandler,
} from "../controllers/role.js";
import Role from "../models/role.js";
const router = express.Router();

router.get(
  "/",
  paginationMiddleware(Role),
  getRolesHandler,
);
router.post("/", createRoleHandler);
router.get("/:id", getRoleByIdHandler);
router.put("/:id", updateRoleHandler);
router.delete("/:id", deleteRoleHandler);

export default router;
