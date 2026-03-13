import OutdoorOrder from "../models/order.js";

export const createOutdoorOrder = async (data) => {
  // 1️⃣ Generate Order Number
  const lastOrder = await OutdoorOrder.findOne().sort({ createdAt: -1 });
  const orderNo = lastOrder ? Number(lastOrder.orderNo) + 1 : 1;

  // 2️⃣ Secure Item Calculation
  const items = data.items.map((item) => ({
    ...item,
    total: item.qty * item.rate,
  }));

  // 3️⃣ Subtotal
  const subTotal = items.reduce((sum, item) => sum + item.total, 0);

  // 4️⃣ Discount
  const discount = Number(data.discount) || 0;

  // 5️⃣ GST Percentages
  const cgstPerc = Number(data.cgstPerc) || 0;
  const sgstPerc = Number(data.sgstPerc) || 0;
  const igstPerc = Number(data.igstPerc) || 0;

  // 6️⃣ GST Amounts
  const cgstAmt = (subTotal * cgstPerc) / 100;
  const sgstAmt = (subTotal * sgstPerc) / 100;
  const igstAmt = (subTotal * igstPerc) / 100;

  const totalTax = cgstAmt + sgstAmt + igstAmt;

  // 7️⃣ Grand Total
  const grandTotal = subTotal + totalTax - discount;

  // 8️⃣ Advance & Balance
  const advance = Number(data.advance) || 0;
  const balanceDue = grandTotal - advance;

  const newOrder = new OutdoorOrder({
    ...data,
    orderNo,
    items,
    subTotal,
    discount,
    cgstPerc,
    cgstAmt,
    sgstPerc,
    sgstAmt,
    igstPerc,
    igstAmt,
    advance,
    grandTotal,
    balanceDue,
  });

  return await newOrder.save();
};

export const getOrders = async () => {
  return await OutdoorOrder.find().populate("items.productId outdoorParty");
};

export const getOrderByQuotationNo = async (quotationNo) => {
  return await OutdoorOrder.findOne({ quotationNo }).populate(
    "items.productId outdoorParty",
  );
};

export const getCountOfOrders = async () => {
  const count = await OutdoorOrder.countDocuments();
  return count;
};
