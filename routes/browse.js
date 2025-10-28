var express = require('express');
var router = express.Router();

/* GET browse listings. */
router.get('/', function(req, res, next) {
  res.render('browse', {title: "Browsing data",
                        movies: 25,
                        genres: 6,
                        actors: "Robert Downey Jr.",
  });
});

module.exports = router;
