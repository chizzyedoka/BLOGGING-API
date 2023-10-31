const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createBlog,
  getAllPublishedBlogs,
  getPublishedBlog,
} = require("../middleware/blogs");

router.get("/blogs", getAllPublishedBlogs);

router.get("/blogs/:blogname", getPublishedBlog);

router.post("/blogs", auth, createBlog);

module.exports = router;
