const Blog = require('./blogs.models')

const getAllBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs
}

const createBlog = async (blogData) => {
  const blog = new Blog(blogData)
  const savedBlog = await blog.save()
  return savedBlog
}

module.exports = {
  getAllBlogs,
  createBlog,
}