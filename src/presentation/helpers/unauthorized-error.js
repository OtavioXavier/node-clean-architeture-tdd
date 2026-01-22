module.exports = class unauthorizedError extends Error {
  constructor () {
    super('User not authorized')
    this.name = 'unauthorizedError'
  }
}
