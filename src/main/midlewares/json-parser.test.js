const app = require('../config/app')
const request = require('supertest')

describe('JSON parser middleware', () => {
  test('Should parse body as json', async () => {
    app.post('/test_json_parser', (req, res) => {
      res.send(req.body)
    }
    )

    await request(app)
      .post('/test_json_parser')
      .send({ name: 'Marinho' })
      .expect({ name: 'Marinho' })
  })
})
