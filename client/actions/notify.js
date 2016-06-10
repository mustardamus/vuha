module.exports = {
  addNotifyMessage (type, content) {
    if (!content) {
      content = type
      type = 'info'
    }

    this.$root.notifyMessages.push({ type, content })
  },

  addNotifyError (err) {
    let message = err.response.body.message || err.message || 'Error'
    this.$root.addNotifyMessage('danger', message)
  },

  removeNotifyMessage (message) {
    this.$root.notifyMessages.$remove(message)
  }
}
