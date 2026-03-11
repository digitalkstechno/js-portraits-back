import ProductSell from "../models/productSell.js";

export const createProductSell = async (data) => {
  return await ProductSell.create(data);
};

export const getAllProductSell = async () => {
  return await ProductSell.find().sort({ createdAt: -1 }).populate("bookName");
};

export const getCountOfProductSell = async () => {
  return await ProductSell.countDocuments();
};
