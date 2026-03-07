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

describe('Blogs POST API integration tests', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(sampleBlogs)
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'New Blog Post',
      author: 'John Doe',
      url: 'https://example.com/new-blog-post',
      likes: 5
    }

    const savedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, sampleBlogs.length + 1)

    const { title, author, url, likes } = savedBlog.body
    assert.deepStrictEqual({ title, author, url, likes }, newBlog)
  })

  test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: 'Blog Without Likes',
      author: 'John Doe',
      url: 'https://example.com/blog-without-likes'
    }

    const savedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { title, author, url, likes } = savedBlog.body
    assert.deepStrictEqual({ title, author, url, likes }, { ...newBlog, likes: 0 })
  })

  test('blog without title and url is not added', async () => {
    const newBlog = { author: 'John Doe' }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, sampleBlogs.length)
  })

})

after(() => {
  mongoose.connection.close()
})