const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const userRouter = require("./routes/user");
const bookRouter = require("./routes/book");
const chatRouter = require("./routes/chatroom")

require("./models/user");
require("./models/chatRoom");
require("./models/mesaage");

const app = express();
const port = process.env.PORT;
const MONGGODB_URL = process.env.REACT_APP_MONGODB_CONNECT;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// API
app.use("/users", userRouter);
app.use("/book", bookRouter);
app.use("/chatroom", chatRouter);

// Connect Monggo.DB
mongoose
  .connect(MONGGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not match`));

  const server = app.listen(8000, () => {
    console.log("Server listening on port 8000");
  });
  const io = require("socket.io")(server, {
    allowEIO3: true,
    cors: {
      origin: true,
      methods: ['GET', 'POST'],
      credentials: true
    }
  });
  const jwt = require("jwt-then");

  const Message = require("../models/message");
  const User = require("../models/chatroom");
  
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.query.token;
      const payload = await jwt.verify(token, process.env.SECRET);
      socket.userId = payload.id;
      next();
    } catch (err) {}
  });
  
  io.on("connection", (socket) => {
    console.log("Connected: " + socket.userId);
  
    socket.on("disconnect", () => {
      console.log("Disconnected: " + socket.userId);
    });
  
    socket.on("joinRoom", ({ chatroomId }) => {
      socket.join(chatroomId);
      console.log("A user joined chatroom: " + chatroomId);
    });
  
    socket.on("leaveRoom", ({ chatroomId }) => {
      socket.leave(chatroomId);
      console.log("A user left chatroom: " + chatroomId);
    });
  
    socket.on("chatroomMessage", async ({ chatroomId, message }) => {
      if (message.trim().length > 0) {
        const user = await User.findOne({ _id: socket.userId });
        const newMessage = new Message({
          chatroom: chatroomId,
          user: socket.userId,
          message,
        });
        io.to(chatroomId).emit("newMessage", {
          message,
          name: user.name,
          userId: socket.userId,
        });
        await newMessage.save();
      }
    });
  });