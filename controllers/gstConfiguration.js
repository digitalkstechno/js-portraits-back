import { getGstData, saveOrUpdateGst } from "../services/gstConfiguration.js";

export const getConfiguration = async (req, res) => {
  try {
    const settings = await getGstData();
    if (!settings) {
      return res.status(200).json({ message: "GST Configuration not found" });
    }
    return res.status(200).json(settings);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching settings", error: err.message });
  }
};

export const updateGstSettings = async (req, res) => {
  try {
    const updated = await saveOrUpdateGst(req.body);
    if (!updated) {
      return res
        .status(200)
        .json({ message: "Failed to save GST Configuration " });
    }
    return res.status(200).json({ message: "Settings updated successfully", updated });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error updating settings", error: err.message });
  }
};
