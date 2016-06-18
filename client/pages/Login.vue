<template>
  <div class="columns">
    <div class="column">
      <login-form-container></login-form-container>
    </div>
    <div class="column">
      <forgot-form-container></forgot-form-container>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    LoginFormContainer: require('../containers/LoginFormContainer.vue'),
    ForgotFormContainer: require('../containers/ForgotFormContainer.vue')
  }
}
</script>
