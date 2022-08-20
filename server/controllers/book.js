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

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { imageFile, title, description, tags, author, publisher } = req.body;
  try {
    const updatedBook = {
      imageFile,
      title,
      description,
      tags,
      author,
      publisher,
      _id: id,
    };

    await BookModel.findByIdAndUpdate(id, updatedBook, { new: true });
    res.json(updatedBook);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    await BookModel.findByIdAndRemove(id);
    res.json({ message: "Book Deleted Successfulyy" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

const getBooksBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const author = new RegExp(searchQuery, "i");
    const books = await BookModel.findOne({ author });
    res.json(books);
    console.log(books, "server");
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

const getBooksByTag = async (req, res) => {
  const { tag } = req.params;
  try {
    const books = await BookModel.find({ tags: { $in: tag } });
    res.json(books);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

module.exports = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
  getBooksBySearch,
  getBooksByTag,
};
