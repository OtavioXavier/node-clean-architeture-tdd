const { MissingParamError, InvalidParamError } = require('../../utils/errors')
const AuthUseCase = require('./auth-usecase')

const makeTokenGenerator = () => {
  class TokenGeneratorSpy {
    async generate (userId) {
      this.userId = userId
      return this.accessToken
    }
  }

  const tokenGeneratorSpy = new TokenGeneratorSpy()
  tokenGeneratorSpy.accessToken = 'any_token'
  return tokenGeneratorSpy
}

const makeEncrypter = () => {
  class EncrypterSpy {
    async compare (password, hashedPassword) {
      this.password = password
      this.hashedPassword = hashedPassword
      return this.isValid
    }
  }

  const encripterSpy = new EncrypterSpy()
  encripterSpy.isValid = true
  return encripterSpy
}

const makeLoadUserByEmailRepository = () => {
  class LoadUserByEmailRepositorySpy {
    async load (email) {
      this.email = email
      return this.user
    }
  }

  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  loadUserByEmailRepositorySpy.user = {
    id: 'valid_id',
    password: 'hashed_password'
  }
  return loadUserByEmailRepositorySpy
}

const makeSUT = () => {
  const encripterSpy = makeEncrypter()
  const loadUserByEmailRepositorySpy = makeLoadUserByEmailRepository()
  const tokenGeneratorSpy = makeTokenGenerator()

  const sut = new AuthUseCase(loadUserByEmailRepositorySpy, encripterSpy, tokenGeneratorSpy)
  return {
    sut,
    loadUserByEmailRepositorySpy,
    encripterSpy,
    tokenGeneratorSpy
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

  test('Should return null if an invalid email is provided', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSUT()
    loadUserByEmailRepositorySpy.user = null
    const accessToken = await sut.auth('invalid@email.com', 'any_password')
    expect(accessToken).toBeNull()
  })

  test('Should return null if an invalid password is provided', async () => {
    const { sut, encripterSpy } = makeSUT()
    encripterSpy.isValid = false
    const accessToken = await sut.auth('any@email.com', 'invalid_password')
    expect(accessToken).toBeNull()
  })

  test('Should call Encrypter with correct values', async () => {
    const { sut, loadUserByEmailRepositorySpy, encripterSpy } = makeSUT()
    await sut.auth('valid@email.com', 'any_password')
    expect(encripterSpy.password).toBe('any_password')
    expect(encripterSpy.hashedPassword).toBe(loadUserByEmailRepositorySpy.user.password)
  })

  test('Should call TokenGenerator with correct userId', async () => {
    const { sut, tokenGeneratorSpy, loadUserByEmailRepositorySpy } = makeSUT()
    await sut.auth('valid@email.com', 'valid_password')
    expect(tokenGeneratorSpy.userId).toBe(loadUserByEmailRepositorySpy.user.id)
  })
})
