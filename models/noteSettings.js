import mongoose from "mongoose";

const NoteSettingsSchema = new mongoose.Schema(
  {
    quotationNote: { type: String },
    orderNote: { type: String },
    billNote: { type: String },
    entryBy: { type: String, default: "admin" },
    updateBy: { type: String },
  },
  {
    timestamps: true,
  },
);

const NoteSettings = mongoose.model("NoteSettings", NoteSettingsSchema);
export default NoteSettings;
