const express = require("express");
const router = express.Router();
const movieController = require("../controllers/moviesController");

// Routes
router.get("/movies/search/:query", movieController.searchMovies);
router.get("/:name/movies/:title", movieController.getMovieByTitle);
router.get("/:name/movies", movieController.getAllMoviesInList);
router.post("/:name/movies", movieController.addMovieToList);

module.exports = router;
