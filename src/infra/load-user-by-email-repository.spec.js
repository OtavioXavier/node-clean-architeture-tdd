const { MongoClient } = require('mongodb')

class LoadUserByEmailRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async load (email) {
    const user = await this.userModel.findOne({ email })
    return user
  }
}

describe('Load user by email', () => {
  let connection
  let db

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {})
    db = await connection.db(globalThis.__MONGO_DB_NAME__)
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany()
  })

  afterAll(async () => {
    await connection.close()
  })

  test('should returns null if no user is found', async () => {
    const userModel = await db.collection('users')

    const sut = new LoadUserByEmailRepository(userModel)
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })

  test('should returns user if an user is found', async () => {
    const userModel = await db.collection('users')
    await userModel.insertOne({
      email: 'invalid_email@mail.com'
    })
    const sut = new LoadUserByEmailRepository(userModel)
    const user = await sut.load('invalid_email@mail.com')
    expect(user.email).toBe('invalid_email@mail.com')
  })
})
