const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
});

// Use "Email" collection in MongoDB
module.exports = mongoose.model("Email", subscriberSchema, "Email");
