'use strict'

module.exports = {
  login (request, reply) {
    User.findOne({ username: request.query.username }, (err, user) => {
      if (err) {
        return reply(Helpers.boom.badImplementation('Find user'))
      }

      if (user) {
        if (user.validatePassword(request.query.password)) {
          user.lastLogin = Date.now()

          user.save((err) => {
            if (err) {
              return reply(Helpers.boom.badImplementation('Update login time'))
            }

            let token = user.getToken()
            user.password = undefined

            reply({ user, token })
          })
        } else {
          reply(Helpers.boom.preconditionFailed('Password does not match'))
        }
      } else {
        reply(Helpers.boom.preconditionFailed('Username not found'))
      }
    })
  },

  forgot (request, reply) {
    Helpers.mail({
      to: 'me@akrasia.me',
      subject: 'subject und so',
      text: 'nur so der text',
      html: 'mit <a href="http://akrasia.me">link</a>'
    }, (err, body) => {
      if (err) {
        reply(err)
      } else {
        reply(true)
      }
    })
  }
}
