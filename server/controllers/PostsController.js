'use strict'

module.exports = {
  index (request, reply) {
    Post.find((err, posts) => {
      if (err) {
        reply(Helpers.boom.badImplementation('Find posts'))
      } else {
        reply(posts)
      }
    })
  },

  create (request, reply) {
    let post = new Post(request.query)
    post.userId = request.auth.credentials._id

    post.save((err) => {
      if (err) {
        reply(Helpers.boom.badImplementation('Creating post'))
      } else {
        reply(post)
      }
    })
  },

  read (request, reply) {
    Post.findOne({ slug: request.params.slug }, (err, post) => {
      if (err) {
        return reply(Helpers.boom.badImplementation('Find post'))
      }

      if (post) {
        User.findById(post.userId, (err, user) => {
          if (err) {
            return reply(Helpers.boom.badImplementation('Find user'))
          }

          if (user) {
            let retObj = _.assign(post.toJSON(), { user: user.getCleanJSON() })

            reply(retObj)
          } else {
            reply(Helpers.boom.preconditionFailed('User not found'))
          }
        })

      } else {
        reply(Helpers.boom.preconditionFailed('Post not found'))
      }
    })
  },

  update (request, reply) {
    let setObj = { $set: request.query }

    Post.findByIdAndUpdate(request.params.id, setObj, (err, post) => {
      if (err) {
        return reply(Helpers.boom.badImplementation('Find post'))
      }

      if (post) {
        reply(post)
      } else {
        reply(Helpers.boom.preconditionFailed('Post not found'))
      }
    })
  },
}
