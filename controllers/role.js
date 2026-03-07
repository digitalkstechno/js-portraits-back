import {
  createRole,
  deleteRole,
  getRoleById,
  getRoleByName,
  updateRole,
} from "../services/role.js";

export const createRoleHandler = async (req, res) => {
  try {
    const { name } = req.body;
    const exist = await getRoleByName(name);
    if (exist) {
      return res
        .status(404)
        .json({ message: "Role already exist with this name" });
    }

    const role = await createRole(req.body);

    return res.status(201).json({
      message: "Role created successfully",
      role,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating role",
      error: error.message,
    });
  }
};

export const getRolesHandler = async (req, res) => {
  try {
    // const roles = await getRoles();
    return res.status(200).json(req.paginatedResult);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRoleByIdHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const role = await getRoleById(id);
    return res.status(200).json(role);
  } catch (error) {
    return res.status(500).json({ message: "Role not found" });
  }
};

export const updateRoleHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const role = await updateRole(id, req.body);
    if (role) {
      return res
        .status(200)
        .json({ message: "Role updated successfully", role });
    } else {
      return res.status(404).json({ message: "Role not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Role not found" });
  }
};

export const deleteRoleHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const role = await deleteRole(id);
    if (role) {
      return res.status(200).json({ message: "Role deleted successfully" });
    } else {
      return res.status(404).json({ message: "Role not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
