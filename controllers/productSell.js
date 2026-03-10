import {
  createProductSell,
  getAllProductSell,
  getCountOfProductSell,
} from "../services/productSell.js";

export const createproductSell = async (req, res) => {
  try {
    const payload = req.body;

    // Backend validation for safety (Grand Total check)
    const netTotal = parseFloat(payload.grandTotal);
    const paid = parseFloat(payload.amountPaid || 0);

    // Dynamic Payment Status determination
    let status = "Pending";
    if (paid >= netTotal) status = "Paid";
    else if (paid > 0) status = "Partial";

    const finalData = {
      ...payload,
      paymentStatus: status,
      // Frontend se aane wale purchaseDate ko model ke sellDate se map karein agar zaroorat ho
      sellDate: payload.purchaseDate || new Date(),
    };

    const newPurchase = await createProductSell(finalData);

    res.status(201).json({ success: true, data: newPurchase });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getallProductSell = async (req, res) => {
  try {
    const purchases = await getAllProductSell();
    res.status(200).json({ success: true, data: purchases });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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

// controllers/productSell.js mein add karein
export const getPendingPayments = async (req, res) => {
  try {
    // Sirf wahi records jahan balanceDue zero se zyada hai
    const pendingPurchases = await ProductSell.find({ balanceDue: { $gt: 0 } })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: pendingPurchases });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};