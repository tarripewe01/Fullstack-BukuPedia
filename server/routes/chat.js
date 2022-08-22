const express = require("express");
const router = express.Router();

const { createChat, userChats, findChat } = require("../controllers/chat");

router.post("/chat", createChat);
router.get("/chat/:userId", userChats);
router.get("/chat/find/:firstId/:secondId", findChat);

module.exports = router;
