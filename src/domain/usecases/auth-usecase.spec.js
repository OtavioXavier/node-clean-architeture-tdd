const { MissingParamError, InvalidParamError } = require('../../utils/errors')
const AuthUseCase = require('./auth-usecase')

const makeSUT = () => {
  class LoadUserByEmailRepositorySpy {
    async load (email) {
      this.email = email
    }
  }

  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  const sut = new AuthUseCase(loadUserByEmailRepositorySpy)
  return {
    sut,
    loadUserByEmailRepositorySpy
  }
}

describe('AuthUseCase', () => {
  test('Should throw if no email is provided', async () => {
    const { sut } = makeSUT()
    const accessToken = sut.auth()
    await expect(accessToken).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw if no password is provided', async () => {
    const { sut } = makeSUT()
    const accessToken = sut.auth('any@email.com')
    await expect(accessToken).rejects.toThrow(new MissingParamError('password'))
  })

  test('Should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSUT()
    await sut.auth('any@email.com', 'any_password')
    await expect(loadUserByEmailRepositorySpy.email).toBe('any@email.com')
  })

  test('Should throw if no loadUserByEmailRepository is provided', async () => {
    const sut = new AuthUseCase()
    const accessToken = sut.auth('any@email.com', 'any_password')
    await expect(accessToken).rejects.toThrow(new MissingParamError('loadUserByEmailRepository'))
  })

  test('Should throw if loadUserByEmailRepository has no method', async () => {
    const sut = new AuthUseCase({})
    const accessToken = sut.auth('any@email.com', 'any_password')
    await expect(accessToken).rejects.toThrow(new InvalidParamError('loadUserByEmailRepository'))
  })

  test('Should return null if loadUserByEmailRepository returns null', async () => {
    const { sut } = makeSUT()
    const accessToken = await sut.auth('any@email.com', 'any_password')
    expect(accessToken).toBeNull()
  })
})
