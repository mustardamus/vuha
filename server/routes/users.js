'use strict'

const Joi = require('joi')

module.exports = {
  'GET /users': UsersController.index,
  'GET /users/{id}': UsersController.read,
  'DELETE /users/{id}': UsersController.delete,

  'POST /users': {
    handler: UsersController.create,
    config: {
      validate: {
        params: {
          username: Joi.string().required().alphanum(),
          email: Joi.string().required().email(),
          password: Joi.string().required().min(6)
        }
      }
    }
  },

  'PUT /users/{id}': UsersController.update
}
