import {
  deletepayment,
  getByParty,
  getPayments,
  save,
} from "../services/outdoorPartyPayment.js";

export const savePayment = async (req, res) => {
  try {
    const payment = await save(req.body);
    if (!payment) {
      return res.status(404).json({ message: "Failed to save payment" });
    }
    res.status(201).json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllPayment = async (req, res) => {
  try {
    const data = await getPayments();
    if (!payments) {
      return res.json({ message: "Payments not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPaymentByParty = async (req, res) => {
  try {
    const payment = await getByParty(req.params.id);
    if (!payment) {
      return res.json({ message: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const deleted = await deletepayment(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Payments not found" });
    }
    res.json({ success: true, message: "Payment Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
