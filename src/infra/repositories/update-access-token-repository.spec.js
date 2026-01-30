const MongoHelper = require('../helpers/mongo-helper')
const MissingParamErrors = require('../../utils/errors/missing-param-error')
let db

class UpdateAccessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async update (userId, accessToken) {
    if (!userId) {
      throw new MissingParamErrors('userId')
    }
    if (!accessToken) {
      throw new MissingParamErrors('accessToken')
    }
    await this.userModel.updateOne({
      _id: userId
    }, {
      $set: {
        accessToken
      }
    })
  }
}

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new UpdateAccessTokenRepository(userModel)
  return {
    sut,
    userModel
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

  test('should update the user with the given access token', async () => {
    const { sut, userModel } = makeSut()
    const { insertedId } = await userModel.insertOne({ email: 'valid_email@email.com', password: 'valid_password' })
    await sut.update(insertedId, 'valid_token')
    const fakeUpdatedUser = await userModel.findOne({ _id: insertedId })
    expect(fakeUpdatedUser.accessToken).toBe('valid_token')
  })

  test('should throw if no userModel is provided', async () => {
    const sut = new UpdateAccessTokenRepository()
    const userModel = db.collection('users')
    const { insertedId } = await userModel.insertOne({ email: 'valid_email@email.com', password: 'valid_password' })
    const promise = sut.update(insertedId, 'any_token')
    expect(promise).rejects.toThrow()
  })

  test('should throw if no params are provided', async () => {
    const { sut, userModel } = makeSut()
    const { insertedId } = await userModel.insertOne({ email: 'valid_email@email.com', password: 'valid_password' })
    expect(sut.update(insertedId, undefined)).rejects.toThrow(new MissingParamErrors('accessToken'))
    expect(sut.update(undefined, 'any_token')).rejects.toThrow(new MissingParamErrors('userId'))
  })
})
