// const mongoose = require("mongoose");
const chatroomModel = require("../models/chatRoom")
// const Chatroom = mongoose.model("Chatroom");
const createChatroom = async(req, res)=>{
    const chatroom = req.body;
    const chatroomExists = await Chatroom.findOne({ chatroom });
    if (chatroomExists) throw "Chatroom with that name already exists!";
    const newChatroom = new chatroomModel({
        chatroom,
    });
    try {
        await newChatroom.save();
        res.status(201).json(chatroom);
      } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
      }
};

const getAllChatrooms = async (req, res) => {
    try {
        const chatroom = await chatroomModel.find();
        res.status(200).json(chatroom);
      } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
      }
};
module.exports ={
    createChatroom,
    getAllChatrooms,
};