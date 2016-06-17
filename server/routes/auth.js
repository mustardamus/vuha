module.exports = {
  'POST /login': {
    handler: AuthController.login,
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

  'POST /forgot': AuthController.forgot
}
