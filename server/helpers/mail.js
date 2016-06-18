'use strict'

const Mailgun = require('mailgun-js')
const Mailcomposer = require('mailcomposer')

module.exports = function (meta, cb) {
  const cfg = Config.mail

  if (!meta.from) {
    meta.from = cfg.from
  }

  const mailgun = Mailgun({ apiKey: cfg.apiKey, domain: cfg.domain })
  const mail = Mailcomposer(meta)

  mail.build((err, message) => {
    if (err) {
      return cb(err)
    }

    const mimeOpt = { to: meta.to, message: message.toString('ascii') }

    mailgun.messages().sendMime(mimeOpt, (err, body) => {
      if (err) {
        cb(err)
      } else {
        cb(null, body)
      }
    })
  })
}
