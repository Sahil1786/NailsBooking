const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  login_id: { type: String, required: true, unique: true },
  name: String,
  email: String,
  password: String
});

module.exports = mongoose.model("User", userSchema);
