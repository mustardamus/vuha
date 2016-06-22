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

      <p class="nav-item">
        <a class="button" v-link="{ name: 'posts', exact: true }">
          <span class="icon"><i class="fa fa-home"></i></span>
          <span>Posts</span>
        </a>
      </p>

      <template v-if="isAdmin">
        <p class="nav-item">
          <a class="button" v-link="{ name: 'users' }">
            <span class="icon"><i class="fa fa-users"></i></span>
            <span>Users</span>
          </a>
        </p>

        <p class="nav-item">
          <a class="button" v-link="{ name: 'postsNew', exact: true }">
            <span class="icon"><i class="fa fa-users"></i></span>
            <span>New Post</span>
          </a>
        </p>
      </template>
    </div>

    <span class="nav-toggle" @click="onNavToggleClick">
      <span></span>
      <span></span>
      <span></span>
    </span>

    <div :class="{'nav-right': true, 'nav-menu': true, 'is-active': isToggleMenuActive}">
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
import CashMixin from '../mixins/cash.js'

export default {
  mixins: [CashMixin],

  props: {
    isLoggedIn: Boolean,
    isAdmin: Boolean
  },

  data () {
    return {
      isToggleMenuActive: false
    }
  },

  ready () {
    // vue-router highjacks the click event, so @click does not work in template
    // listen on a extra click event via cash and close the nav menu
    this.$('.nav-menu .button').on('click', () => {
      this.isToggleMenuActive = false
    })
  },

  methods: {
    onLogoutClick () {
      this.$emit('logout')
    },

    onNavToggleClick () {
      this.isToggleMenuActive = !this.isToggleMenuActive
    }
  }
}
</script>
