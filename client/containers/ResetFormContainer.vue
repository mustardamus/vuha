<template>
  <reset-form @data="onData"></reset-form>
</template>

<script>
export default {
  components: {
    ResetForm: require('../components/ResetForm.vue')
  },

  methods: {
    onData (data) {
      this.$root.resetPassword(data.password, this.$route.params.token)
    }
  }
}
</script>
