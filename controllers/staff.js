import {
  createStaff,
  deleteStaff,
  getStaff,
  getStaffByEmail,
  getStaffs,
  updateStaff,
} from "../services/staff.js";

export const createStaffHandler = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exist = await getStaffByEmail(email);
    if (exist) {
      return res.status(409).json({ message: "User exists with this email" });
    }

    const user = await createStaff({
      name,
      email,
      password,
      role,
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

export const getStaffHandler = async (req, res) => {
  try {
    const users = await getStaffs();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getStaffByIdHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getStaff(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "User not found" });
  }
};

export const updateStaffHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await updateStaff(id, req.body);
    if (user) {
      return res
        .status(200)
        .json({ message: "User updated successfully", user });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "User not found" });
  }
};

export const deleteStaffHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await deleteStaff(id);
    if (user) {
      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
