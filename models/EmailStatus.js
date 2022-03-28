import mongoose from "mongoose";

const EmailStatusSchema = new mongoose.Schema({
  id: String,
  token: String,
});

module.exports =
  mongoose.models.EmailStatuse ||
  mongoose.model("EmailStatuse", EmailStatusSchema);
