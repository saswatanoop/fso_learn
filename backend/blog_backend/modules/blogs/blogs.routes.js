const blogsRouter = require('express').Router()
const blogController = require('./blogs.controller')

blogsRouter.get('/', blogController.getAllBlogs)
blogsRouter.post('/', blogController.createBlog)

module.exports = blogsRouter