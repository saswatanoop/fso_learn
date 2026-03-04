const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const reducer = (favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite
  }
  // will take the blogs[0] as the initial value of favorite and then compare it with the rest of the blogs
  return blogs.reduce(reducer)
}


module.exports = {
  totalLikes,
  favoriteBlog,
}