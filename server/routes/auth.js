module.exports = {
  'POST /login': {
    handler: 'AuthController.login',
    config: {
      auth: false,
      validate: {
        query: {
          username: Helpers.joi.string().required(),
          password: Helpers.joi.string().required()
        }
      }
    }
  },

  'POST /forgot': {
    handler: 'AuthController.forgot',
    config: {
      auth: false,
      validate: {
        query: {
          usernameOrEmail: Helpers.joi.string().required()
        }
      }
    }
  },

  'POST /reset': {
    handler: 'AuthController.reset',
    config: {
      auth: false,
      validate: {
        query: {
          password: Helpers.joi.string().required().min(6),
          token: Helpers.joi.string().required()
        }
      }
    }
  }
}
