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

  methods: {
    onUserChange (user) {
      if (user) {
        this.isLoggedIn = true
        this.isAdmin = (user.role === 'SUPER_ADMIN' || user.role === 'ADMIN')
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
