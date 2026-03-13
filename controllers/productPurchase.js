import {
  createPurchase,
  getAllPurchases,
  getCountOfProductPurchase,
} from "../services/productPurchase.js";

export const savePurchase = async (req, res) => {
  try {
    const data = req.body;
    if (!data.vendorName || !data.items || data.items.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const savedPurchase = await createPurchase(data);
    if (!savePurchase) {
      return res.status(404).json({ message: "Failed to create purchase" });
    }

    return res.status(201).json({
      success: true,
      message: "Purchase recorded successfully",
      savedPurchase,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error saving purchase",
      error: error.message,
    });
  }
};

export const fetchPurchases = async (req, res) => {
  try {
    const purchases = await getAllPurchases();
    return res.status(200).json(purchases);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching records", error: error.message });
  }
};

export const getProductPurchaseCount = async (req, res) => {
  try {
    const count = await getCountOfProductPurchase();
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
