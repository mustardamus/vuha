'use strict'

const Joi = require('joi')

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
          username: Joi.string().required().alphanum(),
          email: Joi.string().required().email(),
          password: Joi.string().required().min(6)
        }
      }
    }
  },

  'PUT /users/{id}': {
    handler: UsersController.update,
    config: {
      auth: 'jwt',
      plugins: {
        hapiAuthorization: { role: 'SUPER_ADMIN' }
      }
    }
  },

  'POST /login': {
    handler: UsersController.login,
    config: {
      auth: false,
      validate: {
        query: {
          username: Joi.string().required(),
          password: Joi.string().required()
        }
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
          username: Joi.string().required().alphanum(),
          email: Joi.string().required().email(),
          password: Joi.string().min(6),
          oldPassword: Joi.string()
        }
      }
    }
  },

  'DELETE /current_user': {
    handler: UsersController.deleteCurrentUser,
    config: { auth: 'jwt' }
  }
}
