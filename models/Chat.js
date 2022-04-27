import mongoose from "mongoose";

const Chat = new mongoose.Schema({
  users: [String],
  messages: [
    {
      authorID: String,
      text: String,
      sent: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.models.Chat || mongoose.model("Chat", Chat);
