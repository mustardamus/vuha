module.exports = {
  'GET /posts': 'PostsController.index',

  'POST /posts': {
    handler: 'PostsController.create',
    config: {
      auth: 'jwt',
      plugins: {
        hapiAuthorization: { roles: ['SUPER_ADMIN', 'ADMIN'] }
      }
    }
  }
}
