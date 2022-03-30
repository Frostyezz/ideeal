import mongoose from "mongoose";

const PasswordStatusSchema = new mongoose.Schema({
  email: String,
  token: String,
});

module.exports =
  mongoose.models.PasswordStatuse ||
  mongoose.model("PasswordStatuse", PasswordStatusSchema);
