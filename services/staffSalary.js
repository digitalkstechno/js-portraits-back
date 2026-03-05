import mongoose from "mongoose";
import StaffSalary from "../models/staffSalary.js";

export const recordPayment = async (data) => {
  const newRecord = new StaffSalary(data);
  return await newRecord.save();
};

export const getStaffHistory = async (staffId) => {
  return await StaffSalary.find({ staffId }).sort({ date: -1 });
};

// Summary Logic: Particular mahine ka total salary aur exposure nikalne ke liye
export const getStaffStats = async (staffId, month = null, year = null) => {
  const matchQuery = {
    staffId: new mongoose.Types.ObjectId(staffId),
  };

  // Agar month aur year pass kiya hai, tabhi date filter lagao
  if (month && year) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59); // Month ka last second
    matchQuery.date = { $gte: startDate, $lte: endDate };
  }

  const stats = await StaffSalary.aggregate([
    { $match: matchQuery },
    {
      $group: {
        _id: "$type", // "Salary" ya "Exposure" ke basis par group karega
        totalAmount: { $sum: "$amount" },
      },
    },
  ]);

  // Response ko clean object mein convert karna
  const result = { Salary: 0, Exposure: 0 };
  stats.forEach((item) => {
    if (item._id === "Salary") result.Salary = item.totalAmount;
    if (item._id === "Exposure") result.Exposure = item.totalAmount;
  });

  return result;
};

export const deleteRecord = async (id) => {
  return await StaffSalary.findByIdAndDelete(id);
};
