const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// Connect to local Mongo
mongoose
  .connect("mongodb://127.0.0.1:27017/Netflix")
  .then(() => console.log("Connected to Netflix database"))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- Schema ---
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

// Create a list (ex: Trending Now)
router.post("/", async (req, res) => {
  try {
    const list = new List({
      name: req.body.name,
      movies: req.body.movies || [],
    });
    await list.save();
    res.status(201).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all lists
router.get("/", async (req, res) => {
  try {
    const lists = await List.find();
    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get one list by name
router.get("/:name", async (req, res) => {
  try {
    const list = await List.findOne({ name: req.params.name });
    if (!list) return res.status(404).json({ error: "List not found" });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
