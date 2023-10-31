const { User } = require("../models/users");
const { validateUser } = require("../middleware/validate");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

// register a new user
router.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // validate request body is valid
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // validate user exists in database
  let user = await User.findOne({ email });
  if (user) return res.status(403).send("Email is used already");

  // create new user in the database
  user = new User({ firstname, lastname, email, password });

  // encrypt password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  // save user in database
  await user.save();
  res.json({
    message: `signed in as ${user.email}`,
  });
});

module.exports = router;
