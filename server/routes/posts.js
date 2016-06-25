module.exports = {
  'GET /posts': 'PostsController.index',
  'GET /posts/{slug}': 'PostsController.read',

  'POST /posts': {
    handler: 'PostsController.create',
    config: {
      auth: 'jwt',
      plugins: {
        hapiAuthorization: { roles: ['SUPER_ADMIN', 'ADMIN'] }
      },
      validate: {
        query: {
          title: Helpers.joi.string().required(),
          excerpt: Helpers.joi.string().required(),
          markdown: Helpers.joi.string().required(),
          published: Helpers.joi.boolean().required()
        }
      }
    }
  },

  'PUT /posts/{id}': {
    handler: 'PostsController.update',
    config: {
      auth: 'jwt',
      plugins: {
        hapiAuthorization: { roles: ['SUPER_ADMIN', 'ADMIN'] }
      },
      validate: {
        query: {
          title: Helpers.joi.string().required(),
          excerpt: Helpers.joi.string().required(),
          markdown: Helpers.joi.string().required(),
          published: Helpers.joi.boolean().required()
        }
      }
    }
  }
}
