import Quotation from "../models/quotation.js";

export const createQuotation = async (data) => {
  // 1. Auto-generate Quotation Number (Example: QT-2026-001)
  const count = await Quotation.countDocuments();
  const quotationNo = `${(count + 1).toString()}`;

  // 2. Calculate Totals (Double check from backend side for security)
  const items = data.items.map((item) => ({
    ...item,
    total: item.qty * item.rate,
  }));

  const subTotal = items.reduce((acc, item) => acc + item.total, 0);
  const grandTotal = subTotal - (data.discount || 0);

  const newQuotation = new Quotation({
    ...data,
    quotationNo,
    items,
    subTotal,
    grandTotal,
  });

  return await newQuotation.save();
};

export const getAllQuotations = async (filters = {}) => {
  return await Quotation.find(filters).sort({ createdAt: -1 });
};

export const getQuotationById = async (id) => {
  return await Quotation.findById(id);
};

export const getQuotationByQuotationNo = async (quotationNo) => {
  return await Quotation.findOne({ quotationNo: quotationNo }).populate(
    "items.productId",
  );
};

export const getCountOfQuotation = async () => {
  const count = await Quotation.countDocuments();
  return count;
};

export const updateQuotation = async (id, updateData) => {
  // Recalculate if items or discount changed
  if (updateData.items || updateData.discount !== undefined) {
    const items = updateData.items || [];
    updateData.subTotal = items.reduce(
      (acc, item) => acc + item.qty * item.rate,
      0,
    );
    updateData.grandTotal = updateData.subTotal - (updateData.discount || 0);
  }

  return await Quotation.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteQuotation = async (id) => {
  return await Quotation.findByIdAndDelete(id);
};
