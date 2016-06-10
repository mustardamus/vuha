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
    this.$request('post', 'users', data, (err, res) => {
      if (err) {
        this.$root.addNotifyError(err)
      } else {
        this.$root.user = res.user
        this.$root.setUserToken(res.token)
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

  setUserToken (token) {
    this.$root.token = token
    localStorage.setItem('token', token)
  },

  getUserToken () {
    if (this.$root.token) {
      return this.$root.token
    } else {
      let token = localStorage.getItem('token')
      this.$root.token = token

      return token
    }
  },

  loginUser (data) {
    console.log('login user', data);
  }
}
