const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  icon: String,
});

const User = mongoose.model("User", userSchema, "User");

module.exports = User;
