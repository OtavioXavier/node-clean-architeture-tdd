const express = require('express')
const appSetup = require('./setup')

const app = express()
appSetup(app)

module.exports = app
