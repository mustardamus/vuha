module.exports = function (server) {
  const opt = {
    key: Config.auth.jwt.secret,
    validateFunc: Helpers.authenticate,
    verifyOptions: Config.auth.jwt.options
  }

  server.auth.strategy('jwt', 'jwt', opt)
  server.auth.default('jwt')
}
