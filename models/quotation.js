import mongoose from "mongoose";

const quotationItemSchema = new mongoose.Schema(
  {
    date: { type: Date },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductDetails",
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    event: {
      type: String,
    },
    qty: {
      type: Number,
      required: true,
      min: 1,
    },
    rate: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const quotationSchema = new mongoose.Schema(
  {
    quotationNo: {
      type: String,
      required: true,
      unique: true,
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    outdoorParty: {
      type: String, // manually entered but saved for dropdown
      required: true,
    },

    address: {
      type: String,
    },

    contactNo: {
      type: String,
    },

    email: {
      type: String,
    },

    refBy: {
      type: String,
    },

    package: {
      type: String,
    },

    functionDate: {
      type: Date,
    },

    functionName: {
      type: String,
    },

    items: [quotationItemSchema],

    subTotal: {
      type: Number,
      required: true,
    },

    // Tax Fields
    cgstPerc: { type: Number, default: 0 },
    cgstAmt: { type: Number, default: 0 },
    sgstPerc: { type: Number, default: 0 },
    sgstAmt: { type: Number, default: 0 },
    igstPerc: { type: Number, default: 0 },
    igstAmt: { type: Number, default: 0 },

    discount: {
      type: Number,
      default: 0,
    },

    grandTotal: {
      type: Number,
      required: true,
    },

    notes: {
      type: String,
    },

    remarks: {
      type: String,
    },

    entryBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["Draft", "Sent", "Approved", "Cancelled"],
      default: "Draft",
    },
  },
  { timestamps: true },
);

const Quotation = mongoose.model("Quotation", quotationSchema);
export default Quotation;
