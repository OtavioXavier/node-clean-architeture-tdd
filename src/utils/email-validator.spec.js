class EmailValidator {
  isValid (email) {
    return true
  }
}

describe('emailValidator', () => {
  test('should return true if validator return true', () => {
    const sut = new EmailValidator()
    const isValid = sut.isValid('valid_mail@mail.com')
    expect(isValid).toBe(true)
  })
})
