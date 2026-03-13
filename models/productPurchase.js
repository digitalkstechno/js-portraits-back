import mongoose from "mongoose";

const PurchaseItemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  qty: { type: Number, required: true },
  purchaseRate: { type: Number, required: true },
  taxPerc: { type: Number, default: 0 },
  taxAmt: { type: Number, default: 0 },
  totalCost: { type: Number, required: true },
});

const PurchaseSchema = new mongoose.Schema(
  {
    vendorName: { type: String, required: true },
    invoiceNo: { type: String },
    purchaseDate: { type: Date, default: Date.now },
    items: [PurchaseItemSchema], // Array of items
    subTotal: { type: Number, required: true },
    totalTax: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    remarks: { type: String },
  },
  { timestamps: true },
);

const ProductPurchase = mongoose.model("ProductPurchase", PurchaseSchema);
export default ProductPurchase;
