const { User } = require("../models/users");
const express = require("express");
const router = express.Router();

// register a new user
router.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // validate user exists in database
  let user = await User.findOne({ email });
  if (user) return res.status(403).send("Email is used already");

  // create new user in the database
  user = new User({ firstname, lastname, email, password });
  await user.save();
  res.send(user);
});

module.exports = router;
