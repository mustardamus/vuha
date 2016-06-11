'use strict'

let reporters = [{
  reporter: require('good-console'),
  events: {
    request: '*',
    response: '*',
    log: '*',
    error: '*'
  }
}]

if (process.env.NODE_ENV === 'production') {
  reporters = []
}

module.exports = {
  register: require('good'),
  options: { reporters }
}
