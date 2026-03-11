import mongoose from "mongoose";

const GstSettingsSchema = new mongoose.Schema(
  {
    defaultGstRate: {
      type: Number,
      default: 18,
    },
    // इन दोनों को अलग-अलग boolean बना दिया ताकि multiple या none संभव हो सके
    isLocal: {
      type: Boolean,
      default: true,
    }, // true = CGST+SGST enable रहेगा
    isInterstate: {
      type: Boolean,
      default: false,
    }, // true = IGST enable रहेगा

    updatedBy: {
      type: String,
    },
  },
  { timestamps: true },
);

const GstConfigure = mongoose.model("GstConfigure", GstSettingsSchema);
export default GstConfigure;
