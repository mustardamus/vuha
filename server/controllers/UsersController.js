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
    const query = request.query

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

        user.save((err) => {
          if (err) {
            reply(Helpers.boom.badImplementation('Creating user'))
            return
          }

          user.password = undefined

          reply({
            user: user,
            token: Helpers.jwt.sign(user._id)
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
  }
}
