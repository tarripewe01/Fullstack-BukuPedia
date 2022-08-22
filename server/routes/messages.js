const express = require("express");
const { addMessage, getMessages } = require("../controllers/messages");
const router = express.Router();

router.post("/", addMessage);
router.post("/:chatId", getMessages);

module.exports = router;
