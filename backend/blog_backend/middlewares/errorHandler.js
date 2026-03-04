
const errorHandler = (error, request, response, _next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  return response.status(500).send({ error: 'internal server error' })

}

module.exports = errorHandler