const blogsRouter = require('express').Router()
const blogController = require('./blogs.controller')

blogsRouter.get('/', blogController.getAllBlogs)
blogsRouter.post('/', blogController.createBlog)
blogsRouter.delete('/:id', blogController.deleteBlog)
blogsRouter.put('/:id', blogController.updateBlog)

module.exports = blogsRouter