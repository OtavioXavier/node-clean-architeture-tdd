const express = require('express')
const appSetup = require('./setup')
const setupRoutes = require('./routes')

const app = express()
appSetup(app)
setupRoutes(app)

module.exports = app
