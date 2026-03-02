import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    company_name: { type: String, select: false },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    isAdmin: { type: Boolean, default: false },
    password: { type: String, select: false },
    phone: { type: String },
    age: { type: Number },
    gender: { type: String },
    salary: { type: Number },
  },
  {
    timestamps: true,
  },
);

const Staff = mongoose.model("Staff", staffSchema);
export default Staff;
