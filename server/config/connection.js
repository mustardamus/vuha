'use strict'

const fs = require('fs')
const Path = require('path')

const path = Path.join(__dirname, '../../package.json')
const content = fs.readFileSync(path)

module.exports = {
  port: JSON.parse(content).config.server_port
}
