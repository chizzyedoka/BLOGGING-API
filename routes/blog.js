const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { createBlog } = require("../middleware/blogs");

router.get("/blogs", (req, res) => {
  res.status(200).send(Blog.find({ state: "published" }));
});

router.post("/blogs", auth, createBlog);

module.exports = router;
