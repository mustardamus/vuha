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
    let query = request.query

    User.count({ username: query.username }, (err, count) => {
      if (err) {
        reply(Helpers.boom.badImplementation('Counting username'))
        return
      }

      if (count !== 0) {
        reply(Helpers.boom.preconditionFailed('Username already exists'))
        return
      }

      User.count({ email: query.email }, (err, count) => {
        if (err) {
          reply(Helpers.boom.badImplementation('Counting email'))
          return
        }

        if (count !== 0) {
          reply(Helpers.boom.preconditionFailed('E-Mail already exists'))
          return
        }

        let user = new User(query)
        user.password = Helpers.bcrypt.hash(query.password)

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
    let user = request.auth.credentials

    if (user) {
      user.password = undefined
      reply(user)
    } else {
      reply(Helpers.boom.preconditionFailed('Credentials not found'))
    }
  },

  updateCurrentUser (request, reply) {
    let user = request.auth.credentials
    let query = request.query

    if (!user) {
      return reply(Helpers.boom.preconditionFailed('Credentials not found'))
    }

    User.count({ username: query.username }, (err, count) => {
      if (err) {
        return reply(Helpers.boom.badImplementation('Count username'))
      }

      if (user.username !== query.username && count !== 0) {
        return reply(Helpers.boom.preconditionFailed('Username already exists'))
      }

      user.username = query.username

      User.count({ email: query.email }, (err, count) => {
        if (err) {
          return reply(Helpers.boom.badImplementation('Count email'))
        }

        if (user.email !== query.email && count !== 0) {
          return reply(Helpers.boom.preconditionFailed('E-Mail already exists'))
        }

        user.email = query.email

        user.save((err) => {
          if (err) {
            return reply(Helpers.boom.badImplementation('User not saved'))
          }

          // TODO because of pre save in the User model
          // password is encrypet again, thus breaks it
          // so do the hashing here in the user controller boo

          user.password = undefined
          reply(user)
        })
      })
    })
  }
}
