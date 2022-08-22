const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  chatroom: { type: mongoose.Schema.Types.ObjectId, required: "Chatroom is required", ref : "Chatroom", },
  user: { type: String, required: true, ref : "User" },
  message: { type: String, required: "Message is required!" },
});

module.exports = mongoose.model("Message", messageSchema)
