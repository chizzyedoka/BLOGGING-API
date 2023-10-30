const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  lastname: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    minLength: 5,
    maxLength: 1000,
    required: true,
  },
});

const complexityOptions = {
  min: 5,
  max: 1000,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
};

// create method for user object
// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign(
//     { name: this.username },
//     process.env.ACCESS_TOKEN_SECRET,
//     { expiresIn: "2h" }
//   );
//   return token;
// };

const User = mongoose.model("User", userSchema);

module.exports.User = User;
