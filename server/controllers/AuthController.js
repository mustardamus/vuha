'use strict'

const fs = require('fs')
const Handlebars = require('handlebars')

const mailTemplatesPath = __dirname + '/../views/mails/reset'
const resetTextTemplate = Handlebars.compile(fs.readFileSync(mailTemplatesPath + '/text.hbs', 'utf8'))
const resetHtmlTemplate = Handlebars.compile(fs.readFileSync(mailTemplatesPath + '/html.hbs', 'utf8'))

const sendResetToken = function (user, referrer, cb) {
  user.resetToken = user.getResetToken('30m')

  user.save((err) => {
    if (err) {
      return cb(err)
    }

    Helpers.mail({
      to: user.email,
      subject: 'Password reset',
      text: resetTextTemplate({ user, referrer }),
      html: resetHtmlTemplate({ user, referrer })
    }, cb)
  })
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
        sendResetToken(user, request.info.referrer, sendCb)
      } else {
        User.findOne({ email: usernameOrEmail }, (err, user) => {
          if (err) {
            return reply(Helpers.boom.badImplementation('Find email'))
          }

          if (user) {
            sendResetToken(user, request.info.referrer, sendCb)
          } else {
            reply(Helpers.boom.preconditionFailed('User not found'))
          }
        })
      }
    })
  },

  reset (request, reply) {
    let token = request.query.token

    Helpers.jwt.verify(token, (err, decoded) => {
      if (err) {
        return reply(Helpers.boom.preconditionFailed('Token not valid'))
      }

      User.findOne({ resetToken: token }, (err, user) => {
        if (err) {
          return reply(Helpers.boom.badImplementation('Find user'))
        }

        if (user) {
          user.password = Helpers.bcrypt.hash(request.query.password)

          user.save((err) => {
            if (err) {
              reply(Helpers.boom.badImplementation('Saving user'))
            } else {
              reply(true)
            }
          })
        } else {
          reply(Helpers.boom.preconditionFailed('Reset token not found'))
        }
      })
    })
  }
}
