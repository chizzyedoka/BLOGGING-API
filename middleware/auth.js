const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const token = req.header("Authorization").split(" ")[1];
  console.log(token);
  if (!token) return res.status(401).send("Access denied, No token provided");

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    console.log("Logged in user is:", decoded);
    next();
  } catch (ex) {
    console.log(ex);
    res.status(400).send("Invalid token.");
  }
};
