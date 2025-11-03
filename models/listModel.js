const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});

const listSchema = new mongoose.Schema({
  name: String,
  movies: [movieSchema],
});

const List = mongoose.model("List", listSchema, "List");

module.exports = List;
