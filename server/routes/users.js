'use strict'

const Joi = require('joi')

module.exports = {
  'GET /users': {
    handler: UsersController.index,
    config: {
      auth: 'jwt',
      plugins: {
        // hapiAuthorization: { role: 'USER' } // tester :)
      }
    }
  },

  'GET /users/{id}': UsersController.read,
  'DELETE /users/{id}': UsersController.delete,

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

  'PUT /users/{id}': UsersController.update,

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
  }
}
