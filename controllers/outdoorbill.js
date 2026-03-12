import {
  createOrderBill,
  getAllBills,
  getBillById,
  getBillByParty,
  getCountOfBills,
  updateBillById,
} from "../services/outdoorbill.js";

export const createOutdoorBill = async (req, res) => {
  try {
    const bill = await createOrderBill(req.body);
    res.status(201).json({ success: true, data: bill });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const fetchOutdoorBills = async (req, res) => {
  try {
    const bills = await getAllBills(req.query);
    res.status(200).json({ success: true, count: bills.length, bills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const fetchSingleBill = async (req, res) => {
  try {
    const bill = await getBillById(req.params.id);
    if (!bill)
      return res
        .status(404)
        .json({ success: false, message: "Bill not found" });
    res.status(200).json({ success: true, bill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const fetchBillByParty = async (req, res) => {
  try {
    const bill = await getBillByParty(req.params.id);
    if (!bill)
      return res
        .status(404)
        .json({ success: false, message: "Bill not found" });
    res.status(200).json({ success: true, bill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const fetchOutdoorBillsCount = async (req, res) => {
  try {
    const count = await getCountOfBills();
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateBill = async (req, res) => {
  try {
    // Note: Update logic should also ideally recalculate totals in Service
    const updatedBill = await updateBillById(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Outdoor bill updated successfully.",
      updatedBill,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
