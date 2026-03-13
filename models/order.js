import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    date: { type: Date },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductDetails",
    },

    itemName: {
      type: String,
      required: true,
    },

    eventName: {
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

const orderSchema = new mongoose.Schema(
  {
    orderNo: {
      type: String,
    },

    date: {
      type: Date,
    },

    contactNo: {
      type: String,
    },

    quotationNo: {
      type: String,
    },

    outdoorParty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },

    couple: {
      type: String,
    },

    address: {
      type: String,
    },

    remarks: {
      type: String,
    },

    notes: {
      type: String,
    },

    package: {
      type: String,
    },

    items: [orderItemSchema],

    // Billing Section
    subTotal: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    // GST Fields
    cgstPerc: { type: Number, default: 0 },
    cgstAmt: { type: Number, default: 0 },

    sgstPerc: { type: Number, default: 0 },
    sgstAmt: { type: Number, default: 0 },

    igstPerc: { type: Number, default: 0 },
    igstAmt: { type: Number, default: 0 },

    advance: {
      type: Number,
      default: 0,
    },

    grandTotal: {
      type: Number,
      default: 0,
    },

    balanceDue: {
      type: Number,
      default: 0,
    },

    paymentMode: {
      type: String,
    },
  },
  { timestamps: true },
);

const OutdoorOrder = mongoose.model("OutdoorOrder", orderSchema);

export default OutdoorOrder;
