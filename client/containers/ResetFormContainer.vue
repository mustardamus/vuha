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
      console.log('reset shizzle', data, this.$route.params.token);
    }
  }
}
</script>
