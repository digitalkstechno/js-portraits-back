import mongoose from "mongoose";
import createAdmin from "../seeder/adminSeeder.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database is connected successfully");
    createAdmin();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
