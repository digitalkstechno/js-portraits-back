import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    item_name: { type: String },
    hsn_code: { type: String },
    display_in_stock: { type: Boolean, default: false },
    entry_by: { type: String },
    updated_by: { type: String },
  },
  { timestamps: true },
);

const Item = mongoose.model("Item", itemSchema);
export default Item;
