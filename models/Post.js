import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  authorID: String,
  comments: [
    {
      authorID: String,
      content: String,
      reply: String,
      postedAt: Date,
    },
  ],
  location: {
    city: String,
    county: String,
  },
  postedAt: { type: Date, default: Date.now },
  upvoters: [String],
  title: String,
  desc: String,
  files: [String],
});

module.exports = mongoose.models.Post || mongoose.model("Post", PostSchema);
