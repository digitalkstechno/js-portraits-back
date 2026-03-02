import { getStaffByAdmin } from "../services/staff.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcryptjs";

export const loginAdminHandler = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res
        .status(400)
        .json({ message: "User name and password are required" });
    }

    const admin = await getStaffByAdmin(name);
    if (!admin) {
      return res
        .status(404)
        .json({ message: "Admin not found with this user name" });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(admin);

    return res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      id: admin._id,
      email: admin.email,
      password: admin.password,
      isAdmin: admin.isAdmin,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
