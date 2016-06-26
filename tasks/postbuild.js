'use strict'

const fs = require('fs')
const crypto = require('crypto')
const path = require('path')

let publicPath = path.join(__dirname, '../public')
let buildFile = 'build.js'
let buildPath = publicPath + '/' + buildFile
let indexPath = publicPath + '/index.html'

if (fs.existsSync(buildPath)) {
  let buildContent = fs.readFileSync(buildPath, 'utf8')
  let md5Hash = crypto.createHash('md5').update(buildContent).digest('hex')
  let md5File = md5Hash + '.js'
  let indexContent = fs.readFileSync(indexPath, 'utf8')

  fs.renameSync(buildPath, publicPath + '/' + md5File)
  fs.writeFileSync(indexPath, indexContent.replace(buildFile, md5File), 'utf8')

  console.log(buildFile + ' -> ' + md5File)
}
