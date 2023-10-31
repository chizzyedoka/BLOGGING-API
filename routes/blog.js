const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createBlog,
  getAllPublishedBlogs,
  getOnePublishedBlog,
  updateOneBlog,
  getAllBlogs,
} = require("../middleware/blogs");

// GET all published blogs
router.get("/blogs", getAllPublishedBlogs);

// GET a single published blog based on name
router.get("/blogs/:blogname", getOnePublishedBlog);

// GET all blogs of a author
router.get("/authors/:author", auth, getAllBlogs);

// CREATE new blog
router.post("/blogs", auth, createBlog);

// update a blog
router.put("/blogs/:blogname", auth, updateOneBlog);

module.exports = router;
