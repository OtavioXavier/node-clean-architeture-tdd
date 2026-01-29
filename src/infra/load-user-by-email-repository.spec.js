const { MongoClient } = require('mongodb')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')

let connection, db

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new LoadUserByEmailRepository(userModel)
  return {
    sut,
    userModel
  }
}

describe('Load user by email', () => {
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
    const { sut } = makeSut()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })

  test('should returns user if an user is found', async () => {
    const { sut, userModel } = makeSut()
    const fakeUser = await userModel.insertOne({
      email: 'invalid_email@mail.com'
    })
    const user = await sut.load('invalid_email@mail.com')
    expect(user.id).toEqual(fakeUser.isertedId)
  })
})
