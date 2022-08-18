const express = require("express");
const router = express.Router();

const { createBook, getBooks, getBook } = require("../controllers/book");

router.post("/", createBook);
router.get("/", getBooks);
router.get("/:id", getBook);

module.exports = router;
