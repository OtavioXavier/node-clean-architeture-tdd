const app = require('./app')
const request = require('supertest')

describe('App setup', () => {
  test('Should disable x-powered-by header', async () => {
    app.get('/test_x_powered-by', (req, res) => res.send(''))

    const res = await request(app).get('/test-x-powered-by')
    expect(res.headers['x-powered-by']).toBeUndefined()
  })
})
