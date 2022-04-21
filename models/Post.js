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
  title: String,
  desc: String,
  files: [String],
});

module.exports = mongoose.models.Post || mongoose.model("Post", PostSchema);
