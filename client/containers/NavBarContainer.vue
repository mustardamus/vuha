<template>
  <nav-bar
    :is-logged-in="isLoggedIn"
    :is-admin="isAdmin"
    @logout="onLogout"
  ></nav-bar>
</template>

<script>
export default {
  components: {
    NavBar: require('../components/NavBar.vue')
  },

  data () {
    return {
      isLoggedIn: false,
      isAdmin: false
    }
  },

  watch: {
    '$root.user': 'onUserChange'
  },

  ready () {
    this.$root.getCurrentUser() // trigger token change and get logged in user info
    // TODO this should probably in another container
  },

  methods: {
    onUserChange (user) {
      if (user) {
        this.isLoggedIn = true
        this.isAdmin = (user.role === 'ADMIN')
      } else {
        this.isLoggedIn = false
        this.isAdmin = false
      }
    },

    onLogout () {
      this.$root.logoutUser()
    }
  }
}
</script>
