const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/index', (req, res) => {
  res.json({
    message: "Welcome to the Netflix API",
    routes: [
      "/browse",
      "/lists",
      "/subscribe",
      "/users",
      "/profile"
    ]
  });
});

module.exports = router;
