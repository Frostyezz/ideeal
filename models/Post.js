import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  author: {
    firstName: String,
    lastName: String,
    id: String,
    img: String,
    joined: Date,
    role: String,
  },
  comments: [
    {
      author: {
        firstName: String,
        lastName: String,
        id: String,
        img: String,
      },
      postedAt: Date,
    },
  ],
  location: {
    city: String,
    county: String,
  },
  postedAt: { type: Date, default: Date.now },
  upvotes: Number,
  title: String,
  desc: String,
  files: [String],
});

module.exports = mongoose.models.Post || mongoose.model("Post", PostSchema);
