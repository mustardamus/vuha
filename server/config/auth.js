module.exports = {
  jwt: {
    secret: 'somesecretkey',
    options: {
      ignoreExpiration: true
    }
  },
  bcrypt: {
    saltRounds: 10
  }
}
