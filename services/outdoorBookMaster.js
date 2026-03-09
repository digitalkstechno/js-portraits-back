import OutdoorBook from "../models/master/outdoorBook.js";

export const getAllBooks = async () => {
  return await OutdoorBook.find().sort({ createdAt: -1 });
};

export const createBook = async (data) => {
  return await OutdoorBook.create(data);
};

export const updateBookById = async (id, data) => {
  return await OutdoorBook.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
};

export const deleteBookById = async (id) => {
  return await OutdoorBook.findByIdAndDelete(id);
};
