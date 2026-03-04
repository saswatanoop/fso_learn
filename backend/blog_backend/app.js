const express = require('express')
const mongoose = require('mongoose')

const env = require('./configs/env')
const unknownEndpoint = require('./middlewares/unknownEndpoints')
const errorHandler = require('./middlewares/errorHandler')
const blogsRouter = require('./modules/blogs/blogs.routes')

const app = express()

const mongoUrl = env.MONGODB_URL

mongoose
  .connect(mongoUrl, { family: 4 })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })

app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app