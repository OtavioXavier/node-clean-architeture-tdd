const validator = require('validator')
class EmailValidator {
  isValid (email) {
    return validator.isEmail(email)
  }
}

describe('emailValidator', () => {
  test('should return true if validator return true', () => {
    const sut = new EmailValidator()
    const isValid = sut.isValid('valid_mail@mail.com')
    expect(isValid).toBe(true)
  })

  test('should return false if validator return false', () => {
    validator.isEmailValid = false
    const sut = new EmailValidator()
    const isValid = sut.isValid('invalid_mail@mail.com')
    expect(isValid).toBe(false)
  })
})
