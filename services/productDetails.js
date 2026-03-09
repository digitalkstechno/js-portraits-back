import ProductDetails from "../models/products.js";

export const createProduct = async (data) => {
  const count = await ProductDetails.countDocuments();
  const sr_no = `${(count + 1).toString()}`;
  const product = new ProductDetails({ ...data, sr_no });
  return product;
};

export const getProducts = async () => {
  return await ProductDetails.find();
};

export const getProductById = async (id) => {
  return await ProductDetails.findById(id);
};

export const getProductsByItems = async (itemId) => {
  const products = await ProductDetails.find({
    item_name: itemId,
  });

  return products;
};

export const getCountOfProducts = async () => {
  const count = await ProductDetails.countDocuments();
  return count;
};

export const updateProduct = async (id, data) => {
  return await ProductDetails.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteProduct = async (id) => {
  return await ProductDetails.findByIdAndDelete(id);
};
