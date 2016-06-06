export default {
  ready () {
    // this.getUsers()
  },

  getUsers () {
    this.$request('get', 'users', (err, res) => {
      if (err) {
        this.$root.addNotifyMessage('danger', 'Can not load users')
      } else {
        this.$root.users = res
      }
    })
  },

  getUser (userId) {
    this.$request('get', 'users/' + userId, (err, res) => {
      if (err) {
        this.$root.addNotifyMessage('danger', 'Can not load user ' + userId)
      } else {
        this.$root.user = res
      }
    })
  },

  createUser (data) {
    this.$request('post', 'users', data, (err, res) => {
      if (err) {
        this.$root.addNotifyMessage('danger', 'Can create user')
      } else {
        this.$root.user = res
      }
    })
  },

  updateUser (userId, data) {
    this.$request('put', 'users/' + userId, data, (err, res) => {
      if (err) {
        this.$root.addNotifyMessage('danger', 'Can update user ' + userId)
      } else {
        this.$root.user = res
      }
    })
  },

  deleteUser (userId) {
    this.$request('delete', 'users/' + userId, (err, res) => {
      if (err) {
        this.$root.addNotifyMessage('danger', 'Can not delete user ' + userId)
      } else {
        this.$root.getUsers()
      }
    })
  },

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
