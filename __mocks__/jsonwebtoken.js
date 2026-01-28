module.exports = {
  token: 'valid_token',

  sign (id, secret) {
    return this.token
  }
}
