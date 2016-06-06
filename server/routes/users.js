'use strict'

const Joi = require('joi')

module.exports = {
  'GET /users': AppController.index,
  'GET /users/{id}': AppController.read,
  'DELETE /users/{id}': AppController.delete,

  'POST /users': {
    handler: AppController.create,
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

  'PUT /users/{id}': AppController.update
}
