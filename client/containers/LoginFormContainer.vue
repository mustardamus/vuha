<template>
  <login-form @data="onData"></login-form>
</template>

<script>
export default {
  components: {
    LoginForm: require('../components/LoginForm.vue')
  },

  methods: {
    onData (data) {
      this.$root.loginUser(data)
    }
  }
}
</script>
