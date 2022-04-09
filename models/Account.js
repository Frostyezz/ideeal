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
  joined: Date,
  img: String,
  role: String,
  posts: [String],
  verified: {
    email: Boolean,
    status: String,
    ic: String,
    sent: Date,
  },
});

module.exports =
  mongoose.models.Account || mongoose.model("Account", AccountSchema);
