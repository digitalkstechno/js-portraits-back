import OutdoorOrder from "../models/order.js";

export const createOutdoorOrder = async (data) => {
  // Generate Order Number
  const count = await OutdoorOrder.countDocuments();
  const year = new Date().getFullYear();
  const orderNo = `${(count + 1).toString()}`;

  // Secure recalculation of items
  const items = data.items.map((item) => ({
    ...item,
    total: item.qty * item.rate,
  }));

  // Calculate totals
  const subTotal = items.reduce((sum, item) => sum + item.total, 0);
  const discount = data.discount || 0;
  const advance = data.advance || 0;

  const grandTotal = subTotal - discount;

  const newOrder = new OutdoorOrder({
    ...data,
    orderNo,
    items,
    subTotal,
    discount,
    advance,
    grandTotal,
  });

  return await newOrder.save();
};

export const getOrderByQuotationNo = async (quotationNo) => {
  return await OutdoorOrder.findOne({ quotationNo }).populate(
    "items.productId",
  );
};

export const getCountOfOrders = async () => {
  const count = await OutdoorOrder.countDocuments();
  return count;
};
