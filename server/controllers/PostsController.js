'use strict'

module.exports = {
  index (request, reply) {
    Post.find((err, posts) => {
      if (err) {
        reply(err)
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
  }
}
