import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  sr_no: { type: Number },
  item_name: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  product_name: { type: String },
  bill_rate: { type: Number },
  per_rate: { type: Number },
  stock_rate: { type: Number },
  total: { type: Number },
  remark: { type: String },
});

const ProductDetails = mongoose.model("ProductDetails", productSchema);
export default ProductDetails;
