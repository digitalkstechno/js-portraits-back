import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema(
  {
    bookName: { type: mongoose.Schema.Types.ObjectId, ref: "OutdoorBook" }, 
    billNo: { type: String },
    partyName: { type: String, required: true },
    contactNo: { type: String },
    sellDate: { type: Date, default: Date.now },

    items: [
      {
        date: { type: Date }, // Fixed: 'Date' capital hona chahiye
        itemName: { type: String, required: true },
        productName: { type: String },
        qty: { type: Number },
        rate: { type: Number, default: 0 },
        total: { type: Number }, // Frontend se 'total' aa raha hai
      },
    ],

    subTotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    totalGst: { type: Number, required: true },
    grandTotal: { type: Number, required: true },

    // Payment Details
    paymentMode: { type: String, default: "Cash" },
    transactionId: { type: String },
    amountPaid: { type: Number, default: 0 },
    balanceDue: { type: Number, default: 0 },

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
