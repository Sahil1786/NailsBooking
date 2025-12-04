const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  login_id: { type: String, required: true, unique: true },
  name: String,
  email: String,
  mobile: String,
  password: String
}, { timestamps: true });  

module.exports = mongoose.model("User", userSchema);
