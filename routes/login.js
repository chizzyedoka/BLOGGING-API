const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const { validateUser } = require("../middleware/validate");
const { User } = require("../models/users");

router.post("/login", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  // validate body of request
  const { error } = validateUser(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).json({
      message: "Invalid details",
    });
  }
  // check user in database
  let user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({
      message: "User doesn't exits",
    });

  // confirm password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  // send auth token
  const token = user.generateAuthToken();
  res.json({ token });
});

module.exports = router;
