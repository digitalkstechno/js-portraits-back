import {
  createQuotation,
  deleteQuotation,
  getAllQuotations,
  getQuotationById,
  updateQuotation,
} from "../services/quotation.js";

export const createQuotationHandler = async (req, res) => {
  try {
    const quotation = await createQuotation(req.body);

    return res.status(201).json({
      message: "Quotation created successfully",
      quotation,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating quotaion",
      error: error.message,
    });
  }
};

export const getQuotationsHandler = async (req, res) => {
  try {
    // const quotation = await getAllQuotations();
    return res.status(200).json(req.paginatedResult);
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
