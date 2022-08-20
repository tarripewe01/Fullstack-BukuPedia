const express = require("express");
const router = express.Router();

const {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
  getBooksBySearch,
  getBooksByTag,
} = require("../controllers/book");

router.post("/", createBook);
router.get("/", getBooks);
router.get("/:id", getBook);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

router.get("/search", getBooksBySearch);
router.get("/tag/:tag", getBooksByTag);

module.exports = router;
