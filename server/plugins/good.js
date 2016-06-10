if (process.env.NODE_ENV !== 'production') {
  module.exports = {
    register: require('good'),
    options: {
      reporters: [{
        reporter: require('good-console'),
        events: {
          request: '*',
          response: '*',
          log: '*',
          error: '*'
        }
      }]
    }
  }
}
