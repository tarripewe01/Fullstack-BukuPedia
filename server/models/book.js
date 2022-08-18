const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: String,
  description: String,
  author: String,
  imageFile: String,
  tanggal_terbit: Date,
  penerbit: String,
  tags: [String],
  jumlah_halaman: Number,
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
