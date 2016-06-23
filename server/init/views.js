module.exports = function (server) {
  server.views({
    engines: { html: require('handlebars') },
    layout: false, // true + create ./server/views/layout/layout.html
    relativeTo: __dirname + '/..',
    path: 'views',
    layoutPath: 'views/layout'
  })
}
