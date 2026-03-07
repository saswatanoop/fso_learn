const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

// Customize the JSON output of the Person modelto include 'id' instead of '_id' and to remove '__v' and '_id' fields
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
