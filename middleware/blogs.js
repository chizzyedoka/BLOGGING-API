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
  // if logged in return ur published blogs
  //else return all published blogs in database
};

module.exports = { createBlog, getAllPublishedBlogs };
