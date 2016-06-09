module.exports = {
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
    // TODO handle jwt (trigger action that stores it in localStorage)
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
  }
}
