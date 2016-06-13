'use strict'

module.exports = function (mongoose) {
  const name = 'User'
  const schema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    admin: { type: Boolean, default: false }
  }, {
    timestamps: true
  })

  schema.methods.validatePassword = function (password) {
    return Helpers.bcrypt.compare(password, this.password)
  }

  return mongoose.model(name, schema)
}
