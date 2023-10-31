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

const getOnePublishedBlog = async (req, res) => {
  const found = await Blog.findOne({
    title: req.params.blogname,
    state: "published",
  });
  if (found) {
    return res.status(200).send(found);
  }
  res.status(404).json({
    message: "Blog doesn't exist",
  });
};

const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find({
    author: req.params.author,
  });
  if (blogs.length === 0) {
    return res.status(404).json({
      message: "Author has no blogs yet!",
    });
  }
  res.status(200).send(blogs);
};

const updateOneBlog = async (req, res) => {
  let blog = await Blog.findOne({
    title: req.params.blogname,
    state: "draft",
    email: req.user.email,
  });
  console.log(blog);
  if (!blog) {
    return res.status(404).json({
      message: "Blog doesn't exist or no longer in draft state",
    });
  }

  const { title, description, bodyContent, tags } = req.body;
  if (title) {
    blog.title = title;
  }
  if (description) {
    blog.description = description;
  }
  if (bodyContent) {
    blog.bodyContent = bodyContent;
  }
  if (tags) {
    blog.tags = tags;
  }
  const updatedBlog = await blog.save();
  res.status(200).json({
    message: "Blog updated successfully",
    updatedBlog,
  });
};

module.exports = {
  createBlog,
  getAllPublishedBlogs,
  getOnePublishedBlog,
  updateOneBlog,
  getAllBlogs,
};
