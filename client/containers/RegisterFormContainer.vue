<template>
  <register-form @data="onData"></register-form>
</template>

<script>
export default {
  components: {
    RegisterForm: require('../components/RegisterForm.vue')
  },

  methods: {
    onData (data) {
      this.$root.createUser(data)
    }
  }
}
</script>
