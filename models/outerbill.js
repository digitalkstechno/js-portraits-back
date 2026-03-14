import mongoose from "mongoose";

const orderBillItemSchema = new mongoose.Schema(
  {
    date: { type: Date },
    productName: { type: String },
    itemName: { type: String, required: true },
    eventName: { type: String },
    qty: { type: Number, required: true, min: 1 },
    rate: { type: Number, required: true, min: 0 },
    amount: { type: Number, required: true }, // qty * rate
    place: { type: String },
    time: { type: String },
  },
  { _id: false },
);

const orderBillSchema = new mongoose.Schema(
  {
    bookName: { type: mongoose.Schema.Types.ObjectId, ref: "OutdoorBook" },
    billNo: { type: String, unique: true },
    date: { type: Date },
    contactNo: { type: String },
    // quotationNo: { type: String },
    outdoorParty: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    couple: { type: String },
    address: { type: String },
    remarks: { type: String },
    notes: { type: String },
    package: { type: String },
    items: [orderBillItemSchema],

    // Calculation Fields
    subTotal: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },

    // Tax Fields
    cgstPerc: { type: Number, default: 0 },
    cgstAmt: { type: Number, default: 0 },
    sgstPerc: { type: Number, default: 0 },
    sgstAmt: { type: Number, default: 0 },
    igstPerc: { type: Number, default: 0 },
    igstAmt: { type: Number, default: 0 },

    grandTotal: { type: Number, default: 0 },
    advance: { type: Number, default: 0 },
    balanceDue: { type: Number, default: 0 }, // grandTotal - advance

    paymentStatus: {
      type: String,
      enum: ["Pending", "Partial", "Paid"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

const OutdoorOrderBill = mongoose.model("OutdoorOrderBill", orderBillSchema);
export default OutdoorOrderBill;
