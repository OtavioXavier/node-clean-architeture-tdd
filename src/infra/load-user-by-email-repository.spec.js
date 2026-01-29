class LoadUserByEmailRepository {
  async load (email) {
    return null
  }
}

describe('Load user by email', () => {
  test('should returns null if no user is found', async () => {
    const sut = new LoadUserByEmailRepository()
    const user = await sut.load('invalid_email@mail.com')
    expect(user).toBeNull()
  })
})
