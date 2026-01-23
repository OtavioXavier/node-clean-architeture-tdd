module.exports = class UnauthorizedError extends Error {
  constructor () {
    super('User not authorized')
    this.name = 'UnauthorizedError'
  }
}
