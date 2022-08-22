const MessagesModel = require("../models/message");

const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

  const message = new MessagesModel({
    chatId,
    senderId,
    text,
  });

  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

const getMessages = async (req, res) => {
  const [chatId] = req.params;

  try {
    const result = await MessagesModel.find({chatId});
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

module.exports = {
  addMessage,
  getMessages,
};
