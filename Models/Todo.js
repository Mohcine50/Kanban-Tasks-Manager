const mongoose = require("mongoose");

const todoShcema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
  },
});

module.exports = mongoose.model("Todo", todoShcema);
