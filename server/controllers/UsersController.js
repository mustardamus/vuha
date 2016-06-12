'use strict'

module.exports = {
  index (request, reply) {
    User.find((err, users) => {
      if (err) {
        return reply(err)
      }

      reply(users)
    })
  },

  create (request, reply) {
    User.count({ username: request.query.username }, (err, count) => {
      if (err) {
        reply(Helpers.boom.badImplementation('Counting username'))
        return
      }

      if (count !== 0) {
        reply(Helpers.boom.preconditionFailed('Username already exists'))
        return
      }

      User.count({ email: request.query.email }, (err, count) => {
        if (err) {
          reply(Helpers.boom.badImplementation('Counting email'))
          return
        }

        if (count !== 0) {
          reply(Helpers.boom.preconditionFailed('E-Mail already exists'))
          return
        }

        let user = new User(request.query)

        user.save((err) => {
          if (err) {
            reply(Helpers.boom.badImplementation('Creating user'))
            return
          }

          user.password = undefined

          reply({
            user: user,
            token: Helpers.jwt.sign(_.toString(user._id))
          })
        })
      })
    })
  },

  read (request, reply) {
    User.findById(request.params.id, (err, user) => {
      if (err) {
        return reply(err)
      }

      reply(user)
    })
  },

  update (request, reply) {
    User.findById(request.params.id, (err, user) => {
      if (err) {
        return reply(err)
      }

      user.username = request.query.username
      user.password = request.query.password

      user.save((err) => {
        if (err) {
          return reply(err)
        }

        reply(user)
      })
    })
  },

  delete (request, reply) {
    User.findByIdAndRemove(request.params.id, (err) => {
      if (err) {
        return reply(err)
      }

      reply({ success: true })
    })
  },

  login (request, reply) {
    User.findOne({ username: request.query.username }, (err, user) => {
      if (err) {
        return reply(Helpers.boom.badImplementation('Find user'))
      }

      if (user) {
        if (user.validatePassword(request.query.password)) {
          user.password = undefined

          reply({
            user: user,
            token: Helpers.jwt.sign(_.toString(user._id))
          })
        } else {
          reply(Helpers.boom.preconditionFailed('Password does not match'))
        }
      } else {
        reply(Helpers.boom.preconditionFailed('Username not found'))
      }
    })
  },

  getCurrentUser (request, reply) {
    let token = request.headers.authorization

    if (!token) {
      return reply(Helpers.boom.preconditionFailed('Token not provided'))
    }

    let userId = Helpers.jwt.verify(token)

    if (!userId) {
      return reply(Helpers.boom.preconditionFailed('Could not verify token'))
    }

    User.findById(userId, (err, user) => {
      if (err) {
        return reply(Helpers.boom.badImplementation('Find user'))
      }

      if (user) {
        reply(user)
      } else {
        reply(Helpers.boom.preconditionFailed('User not found'))
      }
    })
  }
}
