import {
  getTermsData,
  saveOrUpdateTerms,
} from "../services/terms&conditions.js";

export const getTermsHandler = async (req, res) => {
  try {
    const result = await getTermsData();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveTermsHandler = async (req, res) => {
  try {
    const { conditions, user } = req.body;

    if (!Array.isArray(conditions)) {
      return res.status(400).json({ message: "Conditions must be an array" });
    }

    const updatedTerms = await saveOrUpdateTerms(conditions, user);
    res.status(200).json({
      success: true,
      message: "Terms & Conditions saved successfully",
      data: updatedTerms,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
