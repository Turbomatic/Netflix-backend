const List = require("../models/listModel");

// Create a list
exports.createList = async (req, res) => {
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
};

// Search lists (case-insensitive)
exports.searchLists = async (req, res) => {
  try {
    const query = req.params.query;

    const lists = await List.find({
      name: { $regex: query, $options: "i" },
    });

    if (lists.length === 0) {
      return res.status(404).json({ message: "No lists found matching your search" });
    }

    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single list by name
exports.getListByName = async (req, res) => {
  try {
    const list = await List.findOne({ name: req.params.name });

    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all lists
exports.getAllLists = async (req, res) => {
  try {
    const lists = await List.find();
    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
