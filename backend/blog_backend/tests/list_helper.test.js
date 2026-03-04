const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]
const biggerList = listWithOneBlog.concat([
  {
    _id: '5a422aa71b54a676234d17f9',
    title: 'Another Blog',
    author: 'John Doe',
    url: 'https://example.com/blog2',
    likes: 10,
  },
])

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(biggerList)
    assert.strictEqual(result, 15)
  })
})

describe('favorite blog', () => {

  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    assert.deepStrictEqual(result, null)
  })

  test('when list has only one blog, equals that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0])
  })
  test('of a bigger list is calculated right', () => {
    const result = listHelper.favoriteBlog(biggerList)
    assert.deepStrictEqual(result, biggerList[1])
  })

})
