module.exports = function (err, req, res, next) {
  // Log the exception
  console.log(err);
  res.status(500).send("Server error");
};
