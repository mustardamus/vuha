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
    let user = new User(request.query)

    user.save((err) => {
      if (err) {
        return reply(err)
      }

      reply(user)
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
