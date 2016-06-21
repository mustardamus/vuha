<style lang="sass">
.nav-bar
  background: rgba(0, 0, 0, 0.1)
  border-bottom: 2px solid rgba(0, 0, 0, 0.2)
</style>

<template>
  <nav class="nav nav-bar">
    <div class="nav-left">
      <p class="nav-item">
        <a class="button" v-link="{ path: '/', exact: true }">
          <span class="icon"><i class="fa fa-home"></i></span>
          <span>Home</span>
        </a>
      </p>

      <p class="nav-item" v-if="isAdmin">
        <a class="button" v-link="{ name: 'users' }">
          <span class="icon"><i class="fa fa-users"></i></span>
          <span>Users</span>
        </a>
      </p>
    </div>

    <div class="nav-right">
      <template v-if="!isLoggedIn">
        <p class="nav-item">
          <a class="button" v-link="{ name: 'register' }">
            <span class="icon"><i class="fa fa-user-plus"></i></span>
            <span>Register</span>
          </a>
        </p>
        <p class="nav-item">
          <a class="button" v-link="{ name: 'login' }">
            <span class="icon"><i class="fa fa-sign-in"></i></span>
            <span>Login</span>
          </a>
        </p>
      </template>

      <template v-if="isLoggedIn">
        <p class="nav-item">
          <a class="button" v-link="{ name: 'profile' }">
            <span class="icon"><i class="fa fa-user"></i></span>
            <span>Profile</span>
          </a>
        </p>
        <p class="nav-item">
          <a class="button" @click="onLogoutClick">
            <span class="icon"><i class="fa fa-sign-out"></i></span>
            <span>Logout</span>
          </a>
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
