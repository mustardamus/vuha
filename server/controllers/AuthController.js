'use strict'

const sendResetToken = function (user, cb) {
  console.log('send reset token', user);
  Helpers.mail({
    to: 'me@akrasia.me',
    subject: 'subject und so',
    text: 'nur so der text',
    html: 'mit <a href="http://akrasia.me">link</a>'
  }, cb)
}

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
    let usernameOrEmail = request.query.usernameOrEmail
    let sendCb = function (err) {
      if (err) {
        reply(Helpers.boom.badImplementation('Can not send reset mail'))
      } else {
        reply(true)
      }
    }

    User.findOne({ username: usernameOrEmail }, (err, user) => {
      if (err) {
        return reply(Helpers.boom.badImplementation('Find username'))
      }

      if (user) {
        sendResetToken(user, sendCb)
      } else {
        User.findOne({ email: usernameOrEmail }, (err, user) => {
          if (err) {
            return reply(Helpers.boom.badImplementation('Find email'))
          }

          if (user) {
            sendResetToken(user, sendCb)
          } else {
            reply(Helpers.boom.preconditionFailed('User not found'))
          }
        })
      }
    })
  }
}
