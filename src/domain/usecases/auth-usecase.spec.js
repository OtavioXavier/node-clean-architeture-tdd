const { MissingParamError } = require('../../utils/errors')

class AuthUseCase {
  async auth (email) {
    if (!email) {
      throw new MissingParamError('email')
    }
  }
}

describe('AuthUseCase', () => {
  test('Should throw if no email is provided', async () => {
    const sut = new AuthUseCase()
    const accessToken = sut.auth()
    await expect(accessToken).rejects.toThrow(new MissingParamError('email'))
  })
})
