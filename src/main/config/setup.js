module.exports = app => {
  app.disable('x-powered-by')
  app.use((req, res, next) => {
    res.set('access-control-allow-origin', '*')
    next()
  })
}
