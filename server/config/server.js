'use strict'

const Path = require('path')

module.exports = {
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, '../../public')
      }
    }
  }
}
