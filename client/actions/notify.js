module.exports = {
  addNotifyMessage (type, content) {
    if (!content) {
      content = type
      type = 'info'
    }

    this.$root.notifyMessages.push({ type, content })
  },

  removeNotifyMessage (message) {
    this.$root.notifyMessages.$remove(message)
  }
}
