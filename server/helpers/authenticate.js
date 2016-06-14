'use strict'

module.exports = function (decoded, request, cb) {
  User.findById(decoded._id, (err, user) => {
    if (err) {
      return cb(null, false)
    }

    if (user) {
      return cb(null, true, user)
    } else {
      return cb(null, false)
    }
  })
}
