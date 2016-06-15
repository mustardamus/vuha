'use strict'

module.exports = function (mongoose) {
  const name = 'User'
  const schema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: 'USER' },
    lastLogin: { type: Date, default: Date.now() }
  }, {
    timestamps: true
  })

  schema.methods.validatePassword = function (password) {
    if (Helpers.bcrypt.compare(password, this.password)) {
      return true
    } else {
      return false
    }
  }

  schema.methods.getToken = function () {
    let token = Helpers.jwt.sign({
      _id: _.toString(this._id),
      lastLogin: this.lastLogin
    })

    return token
  }

  return mongoose.model(name, schema)
}
