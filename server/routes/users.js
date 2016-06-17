module.exports = {
  'GET /users': {
    handler: UsersController.index,
    config: {
      auth: 'jwt',
      plugins: {
        hapiAuthorization: { roles: ['SUPER_ADMIN', 'ADMIN'] }
      }
    }
  },

  'GET /users/{id}': {
    handler: UsersController.read,
    config: {
      auth: 'jwt',
      plugins: {
        hapiAuthorization: { roles: ['SUPER_ADMIN', 'ADMIN'] }
      }
    }
  },

  'DELETE /users/{id}': {
    handler: UsersController.delete,
    config: {
      auth: 'jwt',
      plugins: {
        hapiAuthorization: { role: 'SUPER_ADMIN' }
      }
    }
  },

  'POST /users': {
    handler: UsersController.create,
    config: {
      auth: false,
      validate: {
        query: {
          username: Helpers.joi.string().required().alphanum(),
          email: Helpers.joi.string().required().email(),
          password: Helpers.joi.string().required().min(6)
        }
      }
    }
  },

  'PUT /users/{id}': {
    handler: UsersController.update,
    config: {
      auth: 'jwt',
      validate: {
        query: {
          role: Helpers.joi.string().required(),
        }
      },
      plugins: {
        hapiAuthorization: { role: 'SUPER_ADMIN' }
      }
    }
  },

  'GET /current_user': {
    handler: UsersController.getCurrentUser,
    config: { auth: 'jwt' }
  },

  'PUT /current_user': {
    handler: UsersController.updateCurrentUser,
    config: {
      auth: 'jwt',
      validate: {
        query: {
          username: Helpers.joi.string().required().alphanum(),
          email: Helpers.joi.string().required().email(),
          password: Helpers.joi.string().min(6),
          oldPassword: Helpers.joi.string()
        }
      }
    }
  },

  'DELETE /current_user': {
    handler: UsersController.deleteCurrentUser,
    config: { auth: 'jwt' }
  }
}
