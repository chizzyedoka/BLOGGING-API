require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const app = express();
const PORT = process.env.PORT;
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
