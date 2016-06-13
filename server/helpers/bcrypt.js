'use strict'

const bcrypt = require('bcrypt')

module.exports = {
  hash (str) {
    let salt = bcrypt.genSaltSync(Config.auth.bcrypt.saltRounds)
    return bcrypt.hashSync(str, salt)
  },

  compare (str, hash) {
    return bcrypt.compareSync(str, hash)
  }
}
