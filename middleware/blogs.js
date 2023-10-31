const Blog = require("../models/blog");

const createBlog = async (req, res) => {
  let { title, description, author } = req.body;
  let email = req.user.email;
  // check if that author already has same blog title
  //create new blog
  const blog = new Blog({ title, description, author, email });
  await blog.save();
  console.log(blog);
  res.status(201).send(blog);
};

const getAllPublishedBlogs = async (req, res) => {
  const blogList = await Blog.find({ state: "published" });
  if (blogList.length === 0) {
    return res.status(200).send("No blogs");
  }
  return res.status(200).send(blogList);
};

const getPublishedBlog = async (req, res) => {
  const found = await Blog.findOne({ title: req.params.blogname });
  if (found) {
    return res.status(200).send(found);
  }
  res.status(404).json({
    message: "Blog doesn't exist",
  });
};

module.exports = { createBlog, getAllPublishedBlogs, getPublishedBlog };
