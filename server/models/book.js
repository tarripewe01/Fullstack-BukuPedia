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
  likeCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Book", bookSchema);
