import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  location: {
    city: String,
    county: String,
  },
  joined: { type: Date, default: Date.now },
  img: String,
  role: String,
  posts: [String],
  favorites: [String],
  friends: [String],
  requests: [String],
  upvotes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  replies: { type: Number, default: 0 },
  verified: {
    email: Boolean,
    status: String,
    ic: String,
    sent: Date,
  },
});

module.exports =
  mongoose.models.Account || mongoose.model("Account", AccountSchema);
