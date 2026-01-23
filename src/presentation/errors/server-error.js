module.exports = class ServerError extends Error {
  constructor () {
    super('Internal error, please try again later.')
    this.name = 'ServerError'
  }
}
