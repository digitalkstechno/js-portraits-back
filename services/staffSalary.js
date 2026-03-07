import mongoose from "mongoose";
import StaffSalary from "../models/staffSalary.js";

export const recordPayment = async (data) => {
  const newRecord = new StaffSalary(data);
  return await newRecord.save();
};

export const getStaffHistory = async (staffId) => {
  return await StaffSalary.find({ staffId }).sort({ date: -1 });
};

export const getStaffSalary = async (staffId) => {
  return await StaffSalary.find().sort({ date: -1 });
};

// Summary Logic: Particular mahine ka total salary aur exposure nikalne ke liye
export const getStaffStats = async (staffId) => {
  // 1. Convert to ObjectId safely
  const sId = new mongoose.Types.ObjectId(staffId);
  const stats = await StaffSalary.aggregate([
    {
      $match: { staffId: sId }, // Exact match with ObjectId
    },
    {
      $group: {
        _id: "$type",
        totalAmount: { $sum: "$amount" },
      },
    },
  ]);

  // Default structure
  const result = { Salary: 0, Exposure: 0 };

  // 2. Loop through result to map values
  stats.forEach((item) => {
    if (item._id === "Salary") result.Salary = item.totalAmount;
    if (item._id === "Exposure") result.Exposure = item.totalAmount;
  });

  return result;
};

export const deleteRecord = async (id) => {
  return await StaffSalary.findByIdAndDelete(id);
};
