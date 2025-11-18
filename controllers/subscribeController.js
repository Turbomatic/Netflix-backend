const Subscriber = require("../models/subscriberModel");

exports.subscribe = async (req, res) => {
  console.log("POST /subscribe hit with body:", req.body);

  const { email } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: "Not a valid email address" });
  }

  try {
    const subscriber = new Subscriber({ email });
    await subscriber.save();

    res.status(200).json({ message: "Subscribed successfully!" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email already subscribed" });
    }
    console.error("Error saving subscriber:", err);
    res.status(500).json({ error: "Server error" });
  }
};
