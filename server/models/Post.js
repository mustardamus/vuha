'use strict'

const marked = require('marked')
const slug = require('slug')

module.exports = function (mongoose) {
  const name = 'Post'
  const schema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    slug: { type: String },
    excerpt: { type: String },
    markdown: { type: String, required: true },
    html: { type: String }
  }, {
    timestamps: true
  })

  schema.pre('save', function (next) {
    this.html = marked(this.markdown)
    this.slug = slug(this.title, { lower: true })

    next()
  })

  return mongoose.model(name, schema)
}
