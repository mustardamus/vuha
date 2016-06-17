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
        this.$root.addNotifyError(err)
      } else {
        if (res) {
          this.$root.user = res
        } else {
          this.$root.addNotifyMessage('danger', 'Can not find user')
        }
      }
    })
  },

  createUser (data) {
    this.$request('post', 'users', data, (err, res) => {
      if (err) {
        this.$root.addNotifyError(err)
      } else {
        this.$root.currentUser = res.user

        this.$root.setUserToken(res.token)
        this.$root.redirectAfterLogin()
      }
    })
  },

  updateUser (userId, data) {
    this.$request('put', 'users/' + userId, data, (err, res) => {
      if (err) {
        this.$root.addNotifyError(err)
      } else {
        this.$root.user = res
        this.$root.addNotifyMessage('success', 'Updated successfully')
      }
    })
  },

  deleteUser (userId) {
    this.$request('delete', 'users/' + userId, (err, res) => {
      if (err) {
        this.$root.addNotifyMessage('danger', 'Can not delete user ' + userId)
      } else {
        this.$root.getUsers()
        this.$router.go({ name: 'users' })
      }
    })
  },

  getCurrentUser () {
    this.$request('get', 'current_user', (err, res) => {
      if (err) {
        this.$root.addNotifyError(err)
      } else {
        this.$root.currentUser = res
      }
    })
  },

  updateCurrentUser (data) {
    this.$request('put', 'current_user', data, (err, res) => {
      if (err) {
        this.$root.addNotifyError(err)
      } else {
        this.$root.currentUser = res
        this.$root.addNotifyMessage('success', 'Updated successfully')
      }
    })
  },

  deleteCurrentUser () {
    this.$request('delete', 'current_user', (err, res) => {
      if (err) {
        this.$root.addNotifyError(err)
      } else {
        this.$root.logoutUser()
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
        this.$root.currentUser = res.user

        this.$root.setUserToken(res.token)
        this.$root.redirectAfterLogin()
      }
    })
  },

  logoutUser () {
    this.$root.removeUserToken()
    this.$root.addNotifyMessage('success', 'Bye ' + this.$root.currentUser.username + '!')
    this.$root.currentUser = false
    this.$router.go({ name: 'home' })
  },

  redirectAfterLogin () {
    this.$root.addNotifyMessage('success', 'Hello ' + this.$root.currentUser.username + '!')
    this.$router.go({ name: 'home' })
  }
}
