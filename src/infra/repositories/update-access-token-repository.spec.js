const MongoHelper = require('../helpers/mongo-helper')
let db

class UpdateAccessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  update (userId, accessToken) {
    this.userModel.updateOne({
      id: userId
    }, {
      $set: {
        accessToken
      }
    })
  }
}

describe('Update access token repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(globalThis.__MONGO_URI__, globalThis.__MONGO_DB_NAME__)
    db = MongoHelper.db
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should the user with the given access token', async () => {
    const userModel = db.collection('users')
    const sut = new UpdateAccessTokenRepository(userModel)
    const fakeUser = await userModel.insertOne({ email: 'valid_email@email.com', password: 'valid_password' })
    sut.update(fakeUser.id, 'valid_token')
    const fakeUpdatedUser = await userModel.findOne({ id: fakeUser.id })
    expect(fakeUpdatedUser.accessToken).toBe('valid_token')
  })
})
