import {
  fetchPrintSettings,
  saveOrUpdatePrintSettings,
} from "../services/printSettings.js";

export const getPrintSettings = async (req, res) => {
  try {
    const profile = await fetchPrintSettings();
    return res.status(200).json(profile || {});
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching print settings", error: err.message });
  }
};

export const updatePrintSettings = async (req, res) => {
  try {
    if (!req.body.companyName) {
      return res.status(400).json({ message: "Company Name is required" });
    }
    const updated = await saveOrUpdatePrintSettings(req.body);
    return res
      .status(200)
      .json({ message: "Print settings updated successfully", updated });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error updating print settings", error: err.message });
  }
};
