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

  schema.pre('save', function (next) {
    let salt = Helpers.bcrypt.genSaltSync(Config.auth.bcrypt.saltRounds)
    this.password = Helpers.bcrypt.hashSync(this.password, salt)
    next()
  })

  schema.methods.validatePassword = function (password) {
    return Helpers.bcrypt.compareSync(password, this.password)
  }

  return mongoose.model(name, schema)
}
