'use strict'

module.exports = function (mongoose) {
  const name = 'Post'
  const schema = new mongoose.Schema({
    title: { type: String, required: true },
    markdown: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }
  }, {
    timestamps: true
  })

  return mongoose.model(name, schema)
}
