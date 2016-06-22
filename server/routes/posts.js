module.exports = {
  'GET /posts': 'PostsController.index',

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
          content: Helpers.joi.string().required()
        }
      }
    }
  }
}
