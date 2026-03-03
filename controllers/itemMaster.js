import {
  createItems,
  deleteItem,
  getItemById,
  getItems,
  updateItem,
} from "../services/itemMaster.js";

export const createItemHandler = async (req, res) => {
  try {
    const role = await createItems(req.body);

    return res.status(201).json({
      message: "Item created successfully",
      role,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating item",
      error: error.message,
    });
  }
};

export const getItemsHandler = async (req, res) => {
  try {
    // const items = await getItems();
    return res.status(200).json(req.paginatedResult);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getItemByIdHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await getItemById(id);
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: "Item not found" });
  }
};

export const updateItemHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await updateItem(id, req.body);
    if (item) {
      return res
        .status(200)
        .json({ message: "Item updated successfully", role });
    } else {
      return res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Item not found" });
  }
};

export const deleteItemHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await deleteItem(id);
    if (item) {
      return res.status(200).json({ message: "Item deleted successfully" });
    } else {
      return res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
