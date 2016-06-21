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
        <a v-link="{ path: '/', exact: true }">
          <span class="icon"><i class="fa fa-home"></i></span>
          Home
        </a>
      </p>

      <p class="navbar-item" v-if="isAdmin">
        <a v-link="{ name: 'users' }">Users</a>
      </p>
    </div>

    <div class="navbar-right">
      <template v-if="!isLoggedIn">
        <p class="navbar-item">
          <a v-link="{ name: 'register' }">Register</a>
        </p>
        <p class="navbar-item">
          <a v-link="{ name: 'login' }">Login</a>
        </p>
      </template>

      <template v-if="isLoggedIn">
        <p class="navbar-item">
          <a v-link="{ name: 'profile' }">Profile</a>
        </p>
        <p class="navbar-item">
          <a @click="onLogoutClick">Logout</a>
        </p>
      </template>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    isLoggedIn: Boolean,
    isAdmin: Boolean
  },

  methods: {
    onLogoutClick () {
      this.$emit('logout')
    }
  }
}
</script>
