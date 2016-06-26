'use strict'

const path = require('path')

module.exports = function (server) {
  server.views({
    engines: { html: require('handlebars') },
    layout: false, // true + create ./server/views/layout/layout.html
    relativeTo: path.join(__dirname, '..'),
    path: 'views',
    layoutPath: 'views/layout'
  })
}
