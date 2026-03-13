import ProductPurchase from "../models/productPurchase.js";

export const createPurchase = async (purchaseData) => {
  const lastInvoice = await ProductPurchase.findOne().sort({ createdAt: -1 });
  const nextInvoiceNo =
    lastInvoice && !isNaN(lastInvoice.invoiceNo)
      ? Number(lastInvoice.invoiceNo) + 1
      : 1;

  let calculatedSubTotal = 0;
  let calculatedTotalTax = 0;

  const processedItems = purchaseData.items.map((item) => {
    const qty = Number(item.qty) || 0;
    const rate = Number(item.purchaseRate) || 0;
    const taxPerc = Number(item.taxPerc) || 0;

    const baseAmount = qty * rate;
    const taxAmt = (baseAmount * taxPerc) / 100;
    const totalCost = baseAmount + taxAmt;

    // Accumulate for Grand Total
    calculatedSubTotal += baseAmount;
    calculatedTotalTax += taxAmt;

    return {
      ...item,
      qty,
      purchaseRate: rate,
      taxPerc,
      taxAmt: Number(taxAmt.toFixed(2)),
      totalCost: Number(totalCost.toFixed(2)),
    };
  });

  const calculatedGrandTotal = calculatedSubTotal + calculatedTotalTax;

  const purchase = new ProductPurchase({
    ...purchaseData,
    invoiceNo: nextInvoiceNo,
    items: processedItems,
    subTotal: Number(calculatedSubTotal.toFixed(2)),
    totalTax: Number(calculatedTotalTax.toFixed(2)),
    grandTotal: Number(calculatedGrandTotal.toFixed(2)),
  });

  return await purchase.save();
};

export const getAllPurchases = async () => {
  return await ProductPurchase.find().sort({ purchaseDate: -1 });
};

export const getPurchaseById = async (id) => {
  return await ProductPurchase.findById(id);
};

export const getCountOfProductPurchase = async () => {
  const count = await ProductPurchase.countDocuments();
  return count;
};
