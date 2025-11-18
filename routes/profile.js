const express = require('express');
const router = express.Router();

/* GET profile */
router.get('/', (req, res) => {
  // Replace with real user data later
  res.json({
    username: "john_doe",
    email: "john@example.com",
    icon: "default.png"
  });
});

module.exports = router;
