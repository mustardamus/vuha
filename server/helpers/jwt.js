'use strict'

const jwt = require('jsonwebtoken')

module.exports = {
  sign (obj) {
    return jwt.sign(obj, Config.auth.jwt.secret)
  }
}
