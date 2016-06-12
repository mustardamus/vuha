'use strict'

module.exports = function (userId, request, cb) {
  User.findById(userId, (err, user) => {
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
