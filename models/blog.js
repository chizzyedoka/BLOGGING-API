const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  state: {
    type: String,
    enum: ["draft", "published"],
    required: true,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
