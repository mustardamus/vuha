module.exports = function (server) {
  const opt = {
    key: Config.auth.secret,
    validateFunc: Helpers.authenticate,
    verifyOptions: Config.auth.options
  }

  server.auth.strategy('jwt', 'jwt', opt)
  server.auth.default('jwt')
}
