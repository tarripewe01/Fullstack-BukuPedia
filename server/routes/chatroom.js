const express = require("express");
const router = express.Router();

const chatroomController = require("../controllers/chatroom");

router.get("/chatroom", chatroomController.getAllChatrooms);
router.post("/chatroom", chatroomController.createChatroom);


module.exports = router;