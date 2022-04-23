import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  authorID: String,
  comments: [
    {
      authorID: String,
      content: String,
      reply: {
        name: String,
        id: String,
      },
      postedAt: { type: Date, default: Date.now },
    },
  ],
  location: {
    city: String,
    county: String,
  },
  postedAt: { type: Date, default: Date.now },
  upvoters: [String],
  favorites: [String],
  title: String,
  desc: String,
  files: [String],
  status: { type: String, default: "NONE" },
});

module.exports = mongoose.models.Post || mongoose.model("Post", PostSchema);
