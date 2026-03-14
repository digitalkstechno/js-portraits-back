import { getSummary } from "../services/summary.js";

export const getFinancialSummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const reportData = await getSummary(startDate, endDate);
    if (!reportData) {
      return res.status(404).json({ message: "No financial summary found" });
    }

    return res.status(200).json({
      success: true,
      message: "Financial data fetched successfully",
      reportData,
    });
  } catch (error) {
    console.error("Error in Financial Controller:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while calculating financial data",
      error: error.message,
    });
  }
};
