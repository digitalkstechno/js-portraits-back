import OutdoorOrderBill from "../models/outerbill.js";

export const createOrderBill = async (data) => {
  // 1. Auto-generate Order Number
  const count = await OutdoorOrderBill.countDocuments();
  const billNo = `${(count + 1).toString()}`;

  // 2. Calculate Subtotal from items
  const subTotal = data.items.reduce(
    (acc, item) => acc + item.qty * item.rate,
    0,
  );

  // 3. Totals Calculation
  const taxTotal = (data.cgst || 0) + (data.sgst || 0) + (data.igst || 0);
  const grandTotal = subTotal - (data.discount || 0) + taxTotal;
  const balanceDue = grandTotal - (data.advance || 0);

  // 4. Set Payment Status
  let status = "Pending";
  if (data.advance >= grandTotal) status = "Paid";
  else if (data.advance > 0) status = "Partial";

  const newBill = new OutdoorOrderBill({
    ...data,
    billNo,
    subTotal,
    grandTotal,
    balanceDue,
    paymentStatus: status,
  });

  return await newBill.save();
};

export const getAllBills = async (query) => {
  return await OutdoorOrderBill.find(query).sort({ createdAt: -1 }).populate("bookName");
};

export const getBillById = async (id) => {
  return await OutdoorOrderBill.findById(id).populate("items.productId");
};

export const getCountOfBills = async () => {
  const count = await OutdoorOrderBill.countDocuments();
  return count;
};

export const updateBillById = async (id) => {
  return await OutdoorOrderBill.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
  });
};
