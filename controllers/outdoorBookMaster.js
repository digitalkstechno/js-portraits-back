import {
  createBook,
  deleteBookById,
  getAllBooks,
  updateBookById,
} from "../services/outdoorBookMaster.js";

export const getBooksHandler = async (req, res) => {
  try {
    const books = await getAllBooks();
    if (!books) {
      return res.status(404).json({ message: "Outdoor books not found" });
    }
    res.status(200).json({ success: true, books });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBookHandler = async (req, res) => {
  try {
    const newBook = await createBook(req.body);
    if (!newBook) {
      return res
        .status(404)
        .json({ message: "Failed to create outdoor books" });
    }
    res.status(201).json({ message: "Book Created", newBook });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookHandler = async (req, res) => {
  try {
    const updated = await updateBookById(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book Updated", data: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBookHandler = async (req, res) => {
  try {
    const deleted = await deleteBookById(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
