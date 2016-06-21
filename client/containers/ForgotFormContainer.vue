<template>
  <forgot-form
    :username-or-email="usernameOrEmail"
    @data="onData"
  ></forgot-form>
</template>

<script>
export default {
  components: {
    ForgotForm: require('../components/ForgotForm.vue')
  },

  data () {
    return {
      usernameOrEmail: ''
    }
  },

  methods: {
    onData (data) {
      this.$root.sendResetToken(data.usernameOrEmail)
    }
  }
}
</script>
