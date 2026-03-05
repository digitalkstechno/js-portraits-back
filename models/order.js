import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    date: { type: Date },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
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

    place: { type: String },

    time: { type: String },
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

    mobNo: {
      type: String,
    },

    quotationNo: {
      type: String,
    },

    custName: {
      type: String,
    },

    couple: {
      type: String,
    },

    address: {
      type: String,
    },

    remark: {
      type: String,
    },

    notes: {
      type: String,
    },

    package: {
      type: String,
    },

    items: [orderItemSchema],

    subTotal: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    advance: {
      type: Number,
      default: 0,
    },

    grandTotal: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const OutdoorOrder = mongoose.model("OutdoorOrder", orderSchema);

export default OutdoorOrder;
