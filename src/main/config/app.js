import express from 'express'
import appSetup from './setup'

const app = express()
appSetup(app)

module.exports = app
