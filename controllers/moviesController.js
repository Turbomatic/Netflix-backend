const List = require("../models/listModel");

// Search movies by title (case-insensitive)
exports.searchMovies = async (req, res) => {
  try {
    const query = req.params.query;

    const lists = await List.find({
      "movies.title": { $regex: query, $options: "i" }
    });

    const matchingMovies = [];

    lists.forEach(list => {
      list.movies.forEach(movie => {
        if (movie.title.toLowerCase().includes(query.toLowerCase())) {
          matchingMovies.push({
            list: list.name,
            title: movie.title,
            description: movie.description,
            image: movie.image
          });
        }
      });
    });

    if (matchingMovies.length === 0)
      return res.status(404).json({ message: "No movies found matching your search" });

    res.json(matchingMovies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one movie by title inside a list
exports.getMovieByTitle = async (req, res) => {
  try {
    const list = await List.findOne({ name: req.params.name });
    if (!list) return res.status(404).json({ error: "List not found" });

    const movie = list.movies.find(
      (m) => m.title.toLowerCase() === req.params.title.toLowerCase()
    );

    if (!movie)
      return res.status(404).json({ error: "Movie not found in this list" });

    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all movies in a list
exports.getAllMoviesInList = async (req, res) => {
  try {
    const list = await List.findOne({ name: req.params.name });
    if (!list) return res.status(404).json({ error: "List not found" });

    res.json(list.movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a movie to a list
exports.addMovieToList = async (req, res) => {
  try {
    const list = await List.findOne({ name: req.params.name });
    if (!list) return res.status(404).json({ error: "List not found" });

    const { title, description, image } = req.body;

    if (!title || !description || !image) {
      return res.status(400).json({ error: "All movie fields are required" });
    }

    const movie = { title, description, image };
    list.movies.push(movie);

    await list.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
