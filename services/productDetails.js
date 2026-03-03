import ProductDetails from "../models/products.js";

export const createProduct = async (data) => {
  return await ProductDetails.create(data);
};

export const getProducts = async () => {
  return await ProductDetails.find();
};

export const getProductById = async (id) => {
  return await ProductDetails.findById(id);
};

export const updateProduct = async (id, data) => {
  return await ProductDetails.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteProduct = async (id) => {
  return await ProductDetails.findByIdAndDelete(id);
};
