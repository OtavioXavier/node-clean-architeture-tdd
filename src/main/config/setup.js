const { cors } = require('../midlewares/cors')
const { jsonParser } = require('../midlewares/json-parser')

module.exports = app => {
  app.disable('x-powered-by')
  app.use(cors)
  app.use(jsonParser)
}
