const blogService = require('./blog.service')

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await blogService.getAllBlogs()
    res.json(blogs)
  } catch (error) {
    next(error)
  }
}

const createBlog = async (req, res, next) => {
  try {
    const blog = await blogService.createBlog(req.body)
    res.status(201).json(blog)
  } catch (error) {
    next(error)
  }
}

const deleteBlog = async (req, res, next) => {
  try {
    await blogService.deleteBlog(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}

const updateBlog = async (req, res, next) => {
  try {
    const updatedBlog = await blogService.updateBlog(req.params.id, req.body)
    res.json(updatedBlog)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
}
