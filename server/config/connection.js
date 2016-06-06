'use strict'

const fs = require('fs')

const packageJson = fs.readFileSync(__dirname + '/../../package.json')

module.exports = {
  port: JSON.parse(packageJson).config.server_port
}
