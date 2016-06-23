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

      // TODO return only clean json

      reply(users)
    })
  },

  create (request, reply) {
    doesUserExist(request.query, (err, exists, msg) => {
      if (err) {
        return reply(err)
      }

      if (exists) {
        return reply(msg)
      }

      let user = new User(request.query)
      user.password = Helpers.bcrypt.hash(request.query.password)

      user.save((err) => {
        if (err) {
          return reply(Helpers.boom.badImplementation('Creating user'))
        }

        reply({ user: user.getCleanJSON(), token: user.getToken() })
      })
    })
  },

  read (request, reply) {
    User.findOne({ username: request.params.username }, (err, user) => {
      if (err) {
        return reply(Helpers.boom.badImplementation('Find user'))
      }

      if (user) {
        reply(user.getCleanJSON())
      } else {
        reply(Helpers.boom.preconditionFailed('User not found'))
      }
    })
  },

  update (request, reply) {
    User.findById(request.params.id, (err, user) => {
      if (err) {
        return reply(Helpers.boom.badImplementation('Find user'))
      }

      if (user) {
        user.role = request.query.role

        user.save((err) => {
          if (err) {
            reply(err)
          } else {
            reply(user.getCleanJSON())
          }
        })
      } else {
        reply(Helpers.boom.preconditionFailed('User not found'))
      }
    })
  },

  delete (request, reply) {
    User.findByIdAndRemove(request.params.id, (err) => {
      if (err) {
        reply(err)
      } else {
        reply(true)
      }
    })
  },

  getCurrentUser (request, reply) {
    let user = request.auth.credentials

    if (user) {
      reply(user.getCleanJSON())
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

      if (query.password && query.oldPassword) {
        if (Helpers.bcrypt.compare(query.oldPassword, user.password)) {
          user.password = Helpers.bcrypt.hash(query.password)
        } else {
          return reply(Helpers.boom.preconditionFailed('Password does not match'))
        }
      }

      user.save((err) => {
        if (err) {
          return reply(Helpers.boom.badImplementation('User not saved'))
        }

        reply(reply(true))
      })
    })
  },

  deleteCurrentUser (request, reply) {
    let user = request.auth.credentials

    if (!user) {
      reply(Helpers.boom.preconditionFailed('Credentials not found'))
    } else {
      user.remove((err) => {
        if (err) {
          reply(Helpers.boom.badImplementation('User not removed'))
        } else {
          reply(true)
        }
      })
    }
  }
}
