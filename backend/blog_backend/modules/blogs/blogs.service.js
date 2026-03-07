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

const deleteBlog = async (id) => {
  await Blog.findByIdAndDelete(id)
}

const updateBlog = async (id, blogData) => {

  const blog = await Blog.findById(id)
  if (!blog) {
    throw new Error('Blog not found')
  }

  blog.title = blogData.title ?? blog.title
  blog.author = blogData.author ?? blog.author
  blog.url = blogData.url ?? blog.url
  blog.likes = blogData.likes ?? blog.likes

  const updatedBlog = await blog.save()
  return updatedBlog
}

// Note: Service functions should not catch errors unless they want to transform them.
// Service should catch errors only if it wants to transform them.
/*
const createBlog = async (blogData) => {
  try {
    const blog = new Blog(blogData)
    return await blog.save()
  } catch (error) {
    throw new Error("Blog creation failed") // new error with a custom message, original error is lost
  }
}
*/
module.exports = {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
}