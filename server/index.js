'use strict'

const Ekso = require('ekso')
const Hapi = require('hapi')
const Chalk = require('chalk')
const Mongoose = require('mongoose')

Chalk.enabled = true

const ekso = Ekso({
  rootDir: __dirname,
  pathTransforms: ['capitalize'],
  globalRequire: {
    '_': 'lodash'
  }
}, [
  {
    path: 'helpers',
    global: true
  },
  {
    path: 'config',
    global: true
  },
  { path: 'plugins' },
  { path: 'init' },
  {
    path: 'models',
    executeFuncs: true,
    funcArgs: [Mongoose],
    globalLast: true
  },
  {
    path: 'controllers',
    globalLast: true
  },
  { path: 'routes' }
])

const initLog = function (namespace, obj) {
  const keys = Object.keys(obj).join(', ')
  console.log(Chalk.green(namespace + ':'), Chalk.yellow(keys))
}

initLog('Plugins', ekso.Plugins)
initLog('Config', ekso.Config)
initLog('Init', ekso.Init)
initLog('Helpers', ekso.Helpers)
initLog('Models', ekso.Models)
initLog('Controllers', ekso.Controllers)

const server = new Hapi.Server(Config.server)
let pluginsArr = []

server.connection(Config.connection)

for (let pluginName in ekso.Plugins) {
  let plugin = ekso.Plugins[pluginName]

  if (plugin.register) {
    pluginsArr.push(plugin)
  }
}

server.register(pluginsArr, (err) => {
  if (err) {
    throw err
  }

  for (let initName in ekso.Init) {
    ekso.Init[initName](server)
  }

  for (let routeName in ekso.Routes) {
    for (let routePath in ekso.Routes[routeName]) {
      let routeArr = routePath.split(' ')
      let handler = ekso.Routes[routeName][routePath]
      let config = { auth: false }
      let chalkRoute = Chalk.yellow('(' + routeName + ') ' + routePath)

      if (!_.isFunction(handler) && _.isObject(handler)) {
        if (handler.config) {
          config = handler.config
        }

        handler = handler.handler
      }

      if (!handler) {
        console.log(Chalk.red('Could not find Controller for'), Chalk.yellow(routePath))
        continue
      }

      console.log(Chalk.green('Route:'), chalkRoute)

      server.route({
        method: routeArr[0],
        path: routeArr[1],
        config: config,
        handler: function (request, reply) {
          handler.call(handler, request, reply)
        }
      })
    }
  }
})

Mongoose.connection.on('open', () => {
  console.log(Chalk.green('Database connected:'), Chalk.yellow(Config.database.url))
})

Mongoose.connection.on('error', () => {
  console.log(Chalk.red('Database connection failed (mongod running?):'), Chalk.yellow(Config.database.url))
})

server.start((err) => {
  if (err) {
    throw err
  }

  console.log(Chalk.green('Server running:'), Chalk.yellow(server.info.uri))

  Mongoose.connect(Config.database.url)
})
