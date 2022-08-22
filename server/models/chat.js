const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("Chat", chatSchema);
