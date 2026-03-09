import { createRole, getRoleByName } from "../services/role.js";
import {
  createStaff,
  deleteStaff,
  getCountOfStaff,
  getStaff,
  getStaffs,
  updateStaff,
} from "../services/staff.js";

export const createStaffHandler = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await createStaff(req.body);
    if (!user) {
      return res.status(404).json({ message: "Failed to create staff" });
    }

    const exist = await getRoleByName(role);

    if (!exist) {
      await createRole({ name: role });
    }

    return res.status(201).json({
      message: "Staff created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating staff",
      error: error.message,
    });
  }
};

export const getStaffHandler = async (req, res) => {
  try {
    // 1. Query se values nikaalein aur default set karein
    const name = req.query.name || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // 2. Service ko call karein
    const result = await getStaffs(name, page, limit);

    // 3. Response bhejien (Aapka Angular isi format ko expect kar raha hai)
    return res.status(200).json({
      success: true,
      total: result.total,
      data: result.data,
      page,
      limit,
    });
  } catch (error) {
    console.error("Error in getStaffHandler:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getStaffByIdHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getStaff(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Staff not found" });
  }
};

export const getStaffCount = async (req, res) => {
  try {
    const count = await getCountOfStaff();
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStaffHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await updateStaff(id, req.body);
    if (user) {
      return res
        .status(200)
        .json({ message: "Staff updated successfully", user });
    } else {
      return res.status(404).json({ message: "Staff not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Staff not found" });
  }
};

export const deleteStaffHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await deleteStaff(id);
    if (user) {
      return res.status(200).json({ message: "Staff deleted successfully" });
    } else {
      return res.status(404).json({ message: "Staff not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
