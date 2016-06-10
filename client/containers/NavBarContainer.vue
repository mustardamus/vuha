<template>
  <nav-bar :logged-in="loggedIn" @logout="onLogout"></nav-bar>
</template>

<script>
export default {
  components: {
    NavBar: require('../components/NavBar.vue')
  },

  data () {
    return {
      loggedIn: false
    }
  },

  watch: {
    '$root.token': 'onTokenChange'
  },

  ready () {
    this.$root.getUserToken()  // trigger token change
  },

  methods: {
    onTokenChange (token) {
      if (token) {
        this.loggedIn = true
      } else {
        this.loggedIn = false
      }
    },

    onLogout () {
      this.$root.logoutUser()
    }
  }
}
</script>
