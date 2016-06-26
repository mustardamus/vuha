'use strict'

module.exports = function (request, cb) {
  let token = request.headers.authorization

  if (token) {
    Helpers.jwt.verify(token, (err, decoded) => {
      if (err) {
        cb(err)
      } else {
        Helpers.authenticate(decoded, null, cb)
      }
    })
  } else {
    return cb(null, false)
  }
}
