import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema(
  {
    bookName: { type: mongoose.Schema.Types.ObjectId, ref: 'OutdoorBook'},
    billNo: { type: String },
    partyName: { type: String, required: true },
    contactNo: { type: String },
    purchaseDate: { type: Date, default: Date.now },

    // Dynamic Items (Matches the UI rows of Outdoor Bill)
    items: [
      {
        date: { type: date },
        itemName: { type: String, required: true },
        productName: { type: String },
        qty: { type: Number },
        rate: { type: Number, default: 0 },
        amount: { type: Number, required: true }, // (Qty * Price) + GST
      },
    ],

    // Totals
    subTotal: { type: Number, required: true },
    discount: { type: Number },
    totalGst: { type: Number, required: true },
    grandTotal: { type: Number, required: true },

    // Payment Tracking
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Partial"],
      default: "Pending",
    },
    notes: { type: String },
  },
  { timestamps: true },
);

const ProductSell = mongoose.model("ProductSell", PurchaseSchema);
export default ProductSell;
