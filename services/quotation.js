import Quotation from "../models/quotation.js";

export const createQuotation = async (data) => {
  // 1. Auto-generate Quotation Number
  const count = await Quotation.countDocuments();
  const quotationNo = `${(count + 1).toString()}`;

  // 2. Calculate Item Totals
  const items = data.items.map((item) => ({
    ...item,
    total: item.qty * item.rate,
  }));

  // 3. SubTotal
  const subTotal = items.reduce((acc, item) => acc + item.total, 0);

  // 4. GST Calculation
  const cgstPerc = data.cgstPerc || 0;
  const sgstPerc = data.sgstPerc || 0;
  const igstPerc = data.igstPerc || 0;

  const cgstAmt = (subTotal * cgstPerc) / 100;
  const sgstAmt = (subTotal * sgstPerc) / 100;
  const igstAmt = (subTotal * igstPerc) / 100;

  const totalTax = cgstAmt + sgstAmt + igstAmt;

  // 5. Discount
  const discount = data.discount || 0;

  // 6. Grand Total
  const grandTotal = subTotal + totalTax - discount;

  const newQuotation = new Quotation({
    ...data,
    quotationNo,
    items,
    subTotal,
    cgstPerc,
    cgstAmt,
    sgstPerc,
    sgstAmt,
    igstPerc,
    igstAmt,
    discount,
    grandTotal,
  });

  return await newQuotation.save();
};

export const getAllQuotations = async (filters = {}) => {
  return await Quotation.find(filters)
    .sort({ createdAt: -1 })
    .populate("items.productId")
    .populate("outdoorParty");
};

export const getQuotationById = async (id) => {
  return await Quottation.findById(id);
};

export const getQuotationByQuotationNo = async (quotationNo) => {
  return await Quotation.findOne({ quotationNo: quotationNo }).populate(
    "items.productId",
  ).populate("outdoorParty");
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

  return await Quotation.findByIdAndUpdate(id, updateData, {
    returnDocument: "after",
  });
};

export const deleteQuotation = async (id) => {
  return await Quotation.findByIdAndDelete(id);
};
