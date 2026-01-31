const { cors } = require('./midlewares/cors')

module.exports = app => {
  app.disable('x-powered-by')
  app.use(cors)
}
