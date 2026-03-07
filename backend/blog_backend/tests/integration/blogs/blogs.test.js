const { beforeEach, describe, test, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const app = require('../../../app')
const Blog = require('../../../modules/blogs/blogs.models')
const { sampleBlogs } = require('./blogs_helper')



const api = supertest(app)

describe('Blogs GET API integration tests', () => {

  describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
      await Blog.deleteMany({})
      await Blog.insertMany(sampleBlogs)
    })

    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, sampleBlogs.length)
    })

    test('id field is defined for each blog', async () => {
      const response = await api.get('/api/blogs')
      response.body.forEach(blog => {
        assert.ok(blog.id, 'Blog id is not defined')
      })
    })

  })

  describe('when there is no blogs saved', () => { })
})

after(() => {
  mongoose.connection.close()
})