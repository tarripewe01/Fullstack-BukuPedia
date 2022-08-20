const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: String,
  description: String,
  author: String,
  imageFile: String,
  publisher: String,
  tags: [String],
  ISBN: Number,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Book", bookSchema);
