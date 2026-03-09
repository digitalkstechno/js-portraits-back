import mongoose from "mongoose";

const TermsSchema = new mongoose.Schema(
  {
    settingsName: { type: String, default: "GlobalTerms" }, // Unique identifier
    conditions: [
      {
        header: { type: String, required: true },
        body: { type: String, required: true },
      },
    ],
    lastUpdatedBy: { type: String },
  },
  { timestamps: true },
);

const Terms = mongoose.model("Terms", TermsSchema);
export default Terms;
