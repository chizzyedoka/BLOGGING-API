const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  author: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  state: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  readCount: {
    type: Number,
    default: 0,
  },
  readingTime: {
    type: Number,
  },
  bodyContent: {
    type: String,
    required: [true, "a blog must have content"],
  },
  ratingAvg: {
    type: Number,
    default: 3.5,
    set: (val) => Math.round(val * 10) / 10,
  },
  numOfRating: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
