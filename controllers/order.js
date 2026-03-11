import {
  createOutdoorOrder,
  getCountOfOrders,
  getOrderByQuotationNo,
  getOrders,
} from "../services/order.js";

export const createOutdoorOrderHandler = async (req, res) => {
  try {
    const order = await createOutdoorOrder(req.body);

    return res.status(201).json({
      message: "Outdoor order created successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating outdoor order",
      error: error.message,
    });
  }
};

export const getOrderByQuotationHandler = async (req, res) => {
  try {
    const { quotationNo } = req.params;

    const order = await getOrderByQuotationNo(quotationNo);

    if (!order) {
      return res.status(404).json({
        message: "Order not found for this quotation",
      });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching order",
      error: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await getOrders();
    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrdersCount = async (req, res) => {
  try {
    const count = await getCountOfOrders();
    res.status(200).json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
