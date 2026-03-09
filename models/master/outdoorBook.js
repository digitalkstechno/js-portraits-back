import mongoose from "mongoose";

const OutdoorBookSchema = new mongoose.Schema(
  {
    bookName: { type: String, required: true, trim: true },
    notDisplayInOutBill: { type: Boolean, default: false },
    entryBy: { type: String },
    updateBy: { type: String },
  },
  { timestamps: true },
);

const OutdoorBook = mongoose.model("OutdoorBook", OutdoorBookSchema);
export default OutdoorBook;
