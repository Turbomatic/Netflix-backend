var express = require('express');
var router = express.Router();

/* GET profile. */
router.get('/', function(req, res, next) {
  res.render('profile', {title: "Your profile"});
});

module.exports = router;
