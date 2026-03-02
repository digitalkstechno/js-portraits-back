import bcrypt from "bcryptjs";
import Staff from "../models/staff.js";

const createAdmin = async () => {
  const exists = await Staff.findOne({ isAdmin: true });

  if (!exists) {
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10,
    );

    await Staff.create({
      company_name: "The JS Portraits",
      name: process.env.ADMIN_USERNAME,
      password: hashedPassword,
      isAdmin: true,
    });

    console.log("✅ Admin created");
  } else {
    console.log("ℹ️ Admin already exists");
  }
};

export default createAdmin;
