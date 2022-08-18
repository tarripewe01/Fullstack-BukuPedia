const express = require("express");
const router = express.Router();

const { createBook, getBooks } = require("../controllers/book");

router.post("/", createBook);
router.get("/", getBooks);

module.exports = router;
