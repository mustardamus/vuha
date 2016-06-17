'use strict'

const Mailgun = require('mailgun-js')
const Mailcomposer = require('mailcomposer')

module.exports = function (to, subject, text, html, cb) {
  const cfg = Config.mail
  const mailgun = Mailgun({ apiKey: cfg.apiKey, domain: cfg.domain })
  const mail = Mailcomposer({ from: cfg.from, to, subject, body: text, html })

  mail.build((err, message) => {
    if (err) {
      return cb(err)
    }

    const mimeOpt = { to, message: message.toString('ascii') }

    mailgun.messages().sendMime(mimeOpt, (err, body) => {
      if (err) {
        cb(err)
      } else {
        cb(null, body)
      }
    })
  })
}
