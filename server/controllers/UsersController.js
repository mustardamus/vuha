'use strict'

const doesUserExist = function (user, currentUser, cb) {
  if (_.isFunction(currentUser)) {
    cb = currentUser
    currentUser = {
      username: '',
      email: ''
    }
  }

  User.count({ username: user.username }, (err, count) => {
    if (err) {
      return cb(Helpers.boom.badImplementation('Counting username'))
    }

    if (user.username !== currentUser.username && count !== 0) {
      return cb(null, true, Helpers.boom.preconditionFailed('Username already exists'))
    }

    User.count({ email: user.email }, (err, count) => {
      if (err) {
        return cb(Helpers.boom.badImplementation('Counting email'))
      }

      if (user.email !== currentUser.email && count !== 0) {
        cb(null, true, Helpers.boom.preconditionFailed('E-Mail already exists'))
      } else {
        cb(null, false)
      }
    })
  })
}

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

    doesUserExist(query, (err, exists, msg) => {
      if (err) {
        return reply(err)
      }

      if (exists) {
        return reply(msg)
      }

      let user = new User

      user.username = query.username
      user.email = query.email
      user.password = Helpers.bcrypt.hash(query.password)

      user.save((err) => {
        if (err) {
          return reply(Helpers.boom.badImplementation('Creating user'))
        }

        user.password = undefined

        reply({
          user: user,
          token: Helpers.jwt.sign(_.toString(user._id))
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

    doesUserExist(query, user, (err, exists, msg) => {
      if (err) {
        return reply(err)
      }

      if (exists) {
        return reply(msg)
      }

      user.username = query.username
      user.email = query.email

      user.save((err) => {
        if (err) {
          return reply(Helpers.boom.badImplementation('User not saved'))
        }

        user.password = undefined
        reply(user)
      })
    })
  }
}
