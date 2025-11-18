var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    title: "Browsing data",
    movies: 25,
    genres: 6,
    actors: "Robert Downey Jr."
  });
});

module.exports = router;
