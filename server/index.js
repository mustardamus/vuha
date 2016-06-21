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
      let routeObj = ekso.Routes[routeName][routePath]
      let handlerArr = []
      let config = { auth: false }

      if (_.isString(routeObj)) {
        handlerArr = routeObj.split('.')
      } else if(_.isObject(routeObj)) {
        if (_.isString(routeObj.handler)) {
          handlerArr = routeObj.handler.split('.')
        } else {
          console.log(Chalk.red('If route config is a Object, "handler" must be defined as a String'))
        }

        if (routeObj.config) {
          config = routeObj.config
        }
      }

      let method = routeArr[0]
      let path = routeArr[1]
      let controller = handlerArr[0]
      let action = handlerArr[1]

      if (!ekso.Controllers[controller]) {
        console.log(Chalk.red('Controller "' + controller + '" not found'))
      } else if (!ekso.Controllers[controller][action]) {
        console.log(Chalk.red('Action "' + controller + '.' + action + '" not found'))
      } else {
        let handlerFunc = ekso.Controllers[controller][action]
        let handler = function (request, reply) {
          handlerFunc.call(ekso.Controllers[controller], request, reply)
        }

        server.route({ method, path, handler, config })
        console.log(Chalk.green('Route:'), Chalk.yellow(routePath + ' -> ' + controller + '.' + action))
      }
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

  Mongoose.connect(Config.database.url)
  console.log(Chalk.green('Server running:'), Chalk.yellow(server.info.uri))
})
