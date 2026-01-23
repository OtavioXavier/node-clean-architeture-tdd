const { MissingParamError } = require('../../utils/errors')

class AuthUseCase {
  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }

    if (!password) {
      throw new MissingParamError('password')
    }
  }
}

describe('AuthUseCase', () => {
  test('Should throw if no email is provided', async () => {
    const sut = new AuthUseCase()
    const accessToken = sut.auth()
    await expect(accessToken).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if no password is provided', async () => {
    const sut = new AuthUseCase()
    const accessToken = sut.auth('any@email.com')
    await expect(accessToken).rejects.toThrow(new MissingParamError('password'))
  })
})
