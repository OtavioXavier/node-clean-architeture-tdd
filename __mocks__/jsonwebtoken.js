module.exports = {
  token: 'valid_token',
  id: '',
  secret: '',

  sign (id, secret) {
    this.id = id
    this.secret = secret
    return this.token
  }
}
