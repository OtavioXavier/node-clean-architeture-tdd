const EmailValidator = require('./email-validator')
const validator = require('validator')
const { MissingParamError } = require('../errors')

const makesut = () => {
  return new EmailValidator()
}

describe('emailValidator', () => {
  test('should return true if validator return true', () => {
    const sut = makesut()
    const isValid = sut.isValid('valid_mail@mail.com')
    expect(isValid).toBe(true)
  })

  test('should return false if validator return false', () => {
    validator.isEmailValid = false
    const sut = makesut()
    const isValid = sut.isValid('invalid_mail@mail.com')
    expect(isValid).toBe(false)
  })

  test('should call validator with correct email', () => {
    const sut = makesut()
    const email = 'any@mail.com'
    sut.isValid(email)
    expect(validator.email).toEqual(email)
  })

  test('should throws if no email is provided', () => {
    const sut = makesut()
    expect(() => { sut.isValid() }).toThrow(new MissingParamError('email'))
  })
})
