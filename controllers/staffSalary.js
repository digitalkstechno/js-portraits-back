import {
  deleteRecord,
  getStaffHistory,
  getStaffStats,
  recordPayment,
} from "../services/staffSalary.js";

export const createPayment = async (req, res) => {
  try {
    const record = await recordPayment(req.body);
    res
      .status(201)
      .json({ success: true, message: "Salary paid to staff", record });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getStaffsHistory = async (req, res) => {
  try {
    const history = await getStaffHistory(req.params.staffId);
    res.status(200).json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Frontend Sidebar Stats ke liye API
export const getStaffSalaryStats = async (req, res) => {
  try {
    const { staffId } = req.params;
    const { month, year } = req.query; // Ye ab optional hain

    // Agar month/year nahi hai toh null pass hoga
    const stats = await getStaffStats(
      staffId,
      month ? parseInt(month) : null,
      year ? parseInt(year) : null,
    );

    res.status(200).json({
      success: true,
      period: month && year ? `${month}/${year}` : "Lifetime",
      stats: stats,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removePayment = async (req, res) => {
  try {
    await deleteRecord(req.params.id);
    res.status(200).json({ success: true, message: "Record deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
