'use strict'

module.exports = function (mongoose) {
  const name = 'User'
  const schema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String },
    email: { type: String },
    admin: { type: Boolean, default: false }
  }, {
    timestamps: true
  })

  return mongoose.model(name, schema)
}
