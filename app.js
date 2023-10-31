require("dotenv").config();
require("express-async-errors");
const mongoose = require("mongoose");
const express = require("express");
const signup = require("./routes/signup");
const login = require("./routes/login");
const auth = require("./middleware/auth");
const errorHandler = require("./middleware/error");
const blogs = require("./routes/blog");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// connect to database
mongoose
  .connect("mongodb://0.0.0.0:27017/blog-api-node", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use("/api", signup);
app.use("/api", login);
app.use("/api", blogs);

app.use(errorHandler);

app.use("*", (req, res) => {
  res.send("Invalid Url or request");
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
