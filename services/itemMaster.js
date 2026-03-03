import Item from "../models/master/items.js";

export const createItems = async (data) => {
  return await Item.create(data);
};

export const getItems = async () => {
  return await Item.find();
};

export const getItemById = async (id) => {
  return await Item.findById(id);
};

export const updateItem = async (id, data) => {
  return await Item.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteItem = async (id) => {
  return await Item.findByIdAndDelete(id);
};
