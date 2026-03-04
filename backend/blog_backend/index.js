const env = require('./configs/env')
const app = require('./app')
const logger = require('./middlewares/logger')

const PORT = env.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})