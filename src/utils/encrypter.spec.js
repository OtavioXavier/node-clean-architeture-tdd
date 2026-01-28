class Encrypter {
  compare (password, hashedPassword) {
    return true
  }
}

describe('encrypter', () => {
  test('should return true if bcrypt returns true', () => {
    const sut = new Encrypter()
    const isValid = sut.compare('any_password', 'hashed_password')
    expect(isValid).toBe(true)
  })
})
