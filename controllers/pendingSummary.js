import { getDetailedSummary } from "../services/pendingSummary.js";

export const getPendingAmountsSummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const reportData = await getDetailedSummary(startDate, endDate);
    if (!reportData) {
      return res.status(404).json({ message: "No pending amount summary found" });
    }

    return res.status(200).json({
      success: true,
      message: "Pending amount data fetched successfully",
      reportData,
    });
  } catch (error) {
    console.error("Error in Financial Controller:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while calculating pending amount data",
      error: error.message,
    });
  }
};
