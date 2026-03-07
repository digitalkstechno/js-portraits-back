import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    company_name: { type: String },
    staffId: { type: String },
    name: { type: String, required: true },
    email: { type: String },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    isAdmin: { type: Boolean, default: false },
    password: { type: String },
    contact_no: { type: String },
    joining_date: { type: Date },
    age: { type: Number },
    gender: { type: String },
    salary: { type: Number },
    address: { type: String },
    remarks: { type: String },
  },
  {
    timestamps: true,
  },
);

const Staff = mongoose.model("Staff", staffSchema);
export default Staff;
