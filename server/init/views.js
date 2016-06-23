module.exports = function (server) {
  server.views({
    engines: { html: require('handlebars') },
    layout: true,
    relativeTo: __dirname + '/..',
    path: 'views',
    layoutPath: 'views/layout'
  })
}
