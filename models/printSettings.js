import mongoose from "mongoose";

const printSettingSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    gstin: { type: String },
    signatureBase64: { type: String }, // signature image data here
    updatedBy: { type: String },
  },
  { timestamps: true },
);

const PrintSetting = mongoose.model("PrintSetting", printSettingSchema);
export default PrintSetting;
