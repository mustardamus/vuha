'use strict'

const jwt = require('jsonwebtoken')

module.exports = {
  sign (obj) {
    return jwt.sign(obj, Config.auth.jwt.secret)
  },

  verify (token, cb) {
    return jwt.verify(token, Config.auth.jwt.secret, cb)
  },

  signExpire (obj, expiresIn) {
    return jwt.sign(obj, Config.auth.jwt.secret, { expiresIn })
  }
}
