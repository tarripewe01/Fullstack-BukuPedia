const BookModel = require("../models/book");

const createBook = async (req, res) => {
  const book = req.body;
  const newBook = new BookModel({
    ...book,
    createdAt: new Date().toISOString(),
  });

  try {
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await BookModel.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

const getBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await BookModel.findById(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

module.exports = { createBook, getBooks, getBook };
