// Post handle
var express = require('express');
var router = express.Router();
////this whore only works with node subsribe.js
///it doesnt run with npm start

// const express = require("express");
const mongoose = require("mongoose");

// const app = express();
// app.use(express.json());

//Connect to local Mongo
mongoose
  .connect("mongodb://127.0.0.1:27017/Netflix")
  .then(() => console.log("Connected to Netflix database"))
  .catch((err) => console.error(" MongoDB connection error:", err));

// schema aka json
const emailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }
});

// q t mos krijoj collection t ri
const Subscriber = mongoose.model("Email", emailSchema, "Email");

// get handle
// app.get("/", (req, res) => {
//   console.log("GET / hit");
//   res.send("Server is working!");
// });


/* GET users listing. */
router.post('/', async (req, res) => {
  console.log("POST /subscribe hit with body:", req.body);

  const { email } = req.body;

  // email regex + db check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: "Not a valid email address" });
  }

  try {
    const subscriber = new Subscriber({ email });
    await subscriber.save();
    return res.status(200).json({ message: "Subscribed successfully!" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email already subscribed" });
    }
    console.error("Error saving subscriber:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;


// app.post("/subscribe", async (req, res) => {
//   console.log("POST /subscribe hit with body:", req.body);



//   const { email } = req.body;

//   // email regex + db check
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!email || !emailRegex.test(email)) {
//     return res.status(400).json({ error: "Not a valid email address" });
//   }

//   try {
//     const subscriber = new Subscriber({ email });
//     await subscriber.save();
//     return res.status(200).json({ message: "Subscribed successfully!" });
//   } catch (err) {
//     if (err.code === 11000) {
//       return res.status(400).json({ error: "Email already subscribed" });
//     }
//     console.error("Error saving subscriber:", err);
//     return res.status(500).json({ error: "Server error" });
//   }
// });

// Mos perdor route tjera
// app.all("*", (req, res) => {
//   console.log("Route not found:", req.method, req.path);
//   res.status(404).send("Route not found");
// });

// Server start
// const PORT = 3000;
// app.listen(PORT, () =>
//   console.log(`🚀 Server running on http://localhost:${PORT}`)
// );
