import {
  createProductSell,
  getAllProductSell,
  getCountOfProductSell,
} from "../services/productSell.js";

export const createproductSell = async (req, res) => {
  try {
    const { supplierName, items, referenceNo, purchaseDate } = req.body;

    // Calculate Totals on Backend for Security
    let subTotal = 0;
    let totalGst = 0;

    items.forEach((item) => {
      const itemBase = item.quantity * item.unitPrice;
      const itemGst = (itemBase * item.gstPercent) / 100;
      subTotal += itemBase;
      totalGst += itemGst;
    });

    const newPurchase = createProductSell({
      supplierName,
      referenceNo,
      purchaseDate,
      items,
      subTotal,
      totalGst,
      grandTotal: subTotal + totalGst,
    });

    res.status(201).json(newPurchase);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getallProductSell = async (req, res) => {
  try {
    const purchases = await getAllProductSell();
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductSellCount = async (req, res) => {
  try {
    const count = await getCountOfProductSell();
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
