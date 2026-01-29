const { MongoClient } = require('mongodb')

module.exports = {
  async connect (uri, dbName) {
    this.uri = uri
    this.dbName = dbName
    this.connection = await MongoClient.connect(uri, {})
    this.db = await this.connection.db(dbName)
  },

  async disconnect () {
    await this.connection.close()
  }
}
