import mongoose from "mongoose";

const outdoorPaymentSchema = new mongoose.Schema(
  {
    transNo: { type: String },
    date: { type: Date },
    outdoorParty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    orderNo: { type: String },
    address: { type: String },
    contactNumber: { type: String },
    billTotalAmt: { type: Number },
    totalPaidAmt: { type: Number },
    totalPendingAmt: { type: Number },
    orderTotalAmt: { type: Number },
    paymentType: { type: String },
    amount: { type: Number },
    remark: { type: String },
    entryBy: { type: String },
    updateBy: { type: String },
  },
  {
    timestamps: true,
  },
);

const OutdoorPayment = mongoose.model("OutdoorPayment", outdoorPaymentSchema);
export default OutdoorPayment;
