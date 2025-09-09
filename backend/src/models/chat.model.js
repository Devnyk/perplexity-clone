const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title:{
    type: String,
    required: true,
  }
})

const userModel = mongoose.model("chat", chatSchema)

module.exports = userModel;