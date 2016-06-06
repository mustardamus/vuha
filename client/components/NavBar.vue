<style lang="sass">
.nav-bar
  padding: 10px 20px
  background: rgba(0, 0, 0, 0.1)
  border-bottom: 2px solid rgba(0, 0, 0, 0.2)

  .v-link-active
    color: #222
</style>

<template>
  <nav class="navbar nav-bar">
    <div class="navbar-left">
      <p class="navbar-item">
        <a v-link="{ path: '/', exact: true }">Home</a>
      </p>
      <p class="navbar-item">
        <a v-link="{ name: 'users' }">Users</a>
      </p>
    </div>

    <div class="navbar-right">
      <p class="navbar-item">
        <a v-link="{ name: 'register' }">Register</a>
      </p>
      <p class="navbar-item">
        <a v-link="{ name: 'login' }">Login</a>
      </p>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {

    }
  },

  components: {

  },

  ready () {

  },

  methods: {

  }
}
</script>
