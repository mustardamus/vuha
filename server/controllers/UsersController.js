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

      let user = new User(request.query)

      user.save((err) => {
        if (err) {
          return reply(err)
        }

        // TODO return user object (remove password field) and signed token
        console.log(user, Helpers.jwt.sign(user._id));

        reply(user)
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
