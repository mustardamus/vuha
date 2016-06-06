<template>
  <register-form @data="onData"></register-form>
</template>

<script>
export default {
  components: {
    RegisterForm: require('../components/RegisterForm.vue')
  },

  watch: {
    '$root.user': 'onUserChange'
  },

  methods: {
    onData (data) {
      this.$root.createUser(data)
    },

    onUserChange (user) {
      this.$root.addNotifyMessage('success', 'User "' + user.username + '" registered')
    }
  }
}
</script>
