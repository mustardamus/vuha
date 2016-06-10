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
        this.$root.redirectAfterLogin()
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
    let token = this.$root.token

    if (token) {
      return token
    } else {
      token = localStorage.getItem('token')
      this.$root.token = token

      return token
    }
  },

  removeUserToken () {
    localStorage.removeItem('token')
    this.$root.token = false
  },

  loginUser (data) {
    this.$request('post', 'login', data, (err, res) => {
      if (err) {
        this.$root.addNotifyError(err)
      } else {
        this.$root.user = res.user

        this.$root.setUserToken(res.token)
        this.$root.redirectAfterLogin()
      }
    })
  },

  logoutUser () {
    this.$root.removeUserToken()
    this.$root.addNotifyMessage('success', 'Bye ' + this.$root.user.username + '!')
    this.$router.go({ name: 'home' })
  },

  redirectAfterLogin () {
    this.$root.addNotifyMessage('success', 'Hello ' + this.$root.user.username + '!')
    this.$router.go({ name: 'home' })
  }
}
