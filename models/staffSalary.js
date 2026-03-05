import mongoose from "mongoose";

const staffSalarySchema = new mongoose.Schema(
  {
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff", // Reference to your Staff Master model
      required: true,
    },
    staffName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
      enum: ["Salary", "Exposure"], // Salary = Regular, Exposure = Extra/Advance
      required: true,
    },
    paymentMode: {
      type: String,
      enum: ["Cash", "UPI", "Bank Transfer", "Cheque"],
      default: "Cash",
    },
    remarks: {
      type: String,
    },
    entryBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const StaffSalary = mongoose.model("StaffSalary", staffSalarySchema);
export default StaffSalary;
