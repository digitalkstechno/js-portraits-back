import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../services/productDetails.js";

export const createProductHandler = async (req, res) => {
  try {
    const product = await createProduct(req.body);

    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating product",
      error: error.message,
    });
  }
};

export const getProductsHandler = async (req, res) => {
  try {
    // const products = await getProducts();
    return res.status(200).json(req.paginatedResult);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProductByIdHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProductById(id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Product not found" });
  }
};

export const updateProductHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await updateProduct(id, req.body);
    if (product) {
      return res
        .status(200)
        .json({ message: "Product updated successfully", role });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Product not found" });
  }
};

export const deleteProductHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await deleteProduct(id);
    if (product) {
      return res.status(200).json({ message: "Product deleted successfully" });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
