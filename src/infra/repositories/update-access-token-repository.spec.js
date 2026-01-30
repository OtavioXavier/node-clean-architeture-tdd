const MongoHelper = require('../helpers/mongo-helper')
const MissingParamErrors = require('../../utils/errors/missing-param-error')
const UpdateAccessTokenRepository = require('./update-access-token-repository')
let db

const makeSut = () => {
  const userModel = db.collection('users')
  const sut = new UpdateAccessTokenRepository(userModel)
  return {
    sut,
    userModel
  }
}

describe('Update access token repository', () => {
  let fakeUserId
  beforeAll(async () => {
    await MongoHelper.connect(globalThis.__MONGO_URI__, globalThis.__MONGO_DB_NAME__)
    db = MongoHelper.db
  })

  beforeEach(async () => {
    const userModel = db.collection('users')
    await userModel.deleteMany()
    const { insertedId } = await userModel.insertOne({ email: 'valid_email@email.com', password: 'valid_password' })
    fakeUserId = insertedId
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should update the user with the given access token', async () => {
    const { sut, userModel } = makeSut()
    await sut.update(fakeUserId, 'valid_token')
    const fakeUpdatedUser = await userModel.findOne({ _id: fakeUserId })
    expect(fakeUpdatedUser.accessToken).toBe('valid_token')
  })

  test('should throw if no userModel is provided', async () => {
    const sut = new UpdateAccessTokenRepository()
    const promise = sut.update(fakeUserId, 'any_token')
    expect(promise).rejects.toThrow()
  })

  test('should throw if no params are provided', async () => {
    const { sut } = makeSut()
    expect(sut.update(fakeUserId, undefined)).rejects.toThrow(new MissingParamErrors('accessToken'))
    expect(sut.update(undefined, 'any_token')).rejects.toThrow(new MissingParamErrors('userId'))
  })
})
