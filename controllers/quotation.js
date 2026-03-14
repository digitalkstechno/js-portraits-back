import { createCustomer, getCustomerByName } from "../services/customer.js";
import {
  createQuotation,
  deleteQuotation,
  getAllQuotations,
  getCountOfQuotation,
  getQuotationById,
  getQuotationByQuotationNo,
  updateQuotation,
} from "../services/quotation.js";

export const createQuotationHandler = async (req, res) => {
  try {
    const { outdoorParty, contactNo, address } = req.body;

    // 1. Check if customer exists
    const exist = await getCustomerByName(outdoorParty);

    let partyId; // Variable to store the final ObjectId

    if (!exist) {
      // 2. Agar nahi milta toh naya create karein
      const customer = await createCustomer({
        name: outdoorParty,
        contact: contactNo,
        address: address,
      });
      partyId = customer._id;
    } else {
      // 3. AGAR MIL JATA HAI toh uski ID use karein (Yeh part missing tha)
      partyId = exist._id;
    }

    // 4. Body mein ID assign karein (Empty string nahi jayegi ab)
    req.body.outdoorParty = partyId;

    const quotation = await createQuotation(req.body);

    if (!quotation) {
      return res.status(404).json({ message: "Failed to create quotation" });
    }

    return res.status(201).json({
      success: true,
      message: "Quotation created successfully",
      data: quotation,
    });
  } catch (error) {
    console.error("Quotation Create Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating quotation",
      error: error.message,
    });
  }
};

export const getQuotationsHandler = async (req, res) => {
  try {
    const quotation = await getAllQuotations();
    return res.status(200).json(quotation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getQuotationByIdHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const quotation = await getQuotationById(id);
    return res.status(200).json(quotation);
  } catch (error) {
    return res.status(500).json({ message: "Quotation not found" });
  }
};

export const getQuotationByQuotationHandler = async (req, res) => {
  try {
    const { quotationNo } = req.params;

    const quotation = await getQuotationByQuotationNo(quotationNo);

    if (!quotation) {
      return res.status(404).json({
        message: "Quotation not found",
      });
    }

    return res.status(200).json(quotation);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching quotation",
      error: error.message,
    });
  }
};

export const getQuotationCount = async (req, res) => {
  try {
    const count = await getCountOfQuotation();
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateQuotationHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const quotation = await updateQuotation(id, req.body);
    if (quotation) {
      return res
        .status(200)
        .json({ message: "Quotation updated successfully", quotation });
    } else {
      return res.status(404).json({ message: "Quotation not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Quotation not found" });
  }
};

export const deleteQuotationHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const quotation = await deleteQuotation(id);
    if (quotation) {
      return res
        .status(200)
        .json({ message: "Quotation deleted successfully" });
    } else {
      return res.status(404).json({ message: "Quotation not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
