<style lang="sass">

</style>

<template>
  <form class="reset-form" v-form name="validation" @submit.prevent="onSubmit">
    <label class="label" for="password">New Password</label>
    <p class="control">
      <input id="password" type="password" name="password" placeholder="********"
        v-form-ctrl minlength="6" required v-model="password"
        :class="{
          input: true,
          'is-danger': validation.password.$invalid && validation.$submitted
        }"
      >
      <span class="help is-danger" v-if="validation.password.$invalid && validation.$submitted">
        <template v-if="validation.password.$error.required">
          Please provide your new Password
        </template>
        <template v-if="validation.password.$error.minlength">
          Password must be at least 6 characters long
        </template>
      </span>
    </p>

    <label class="label" for="passwordCheck">New Password Confirmation</label>
    <p class="control">
      <input id="passwordCheck" type="password" name="passwordCheck"
        placeholder="********" v-form-ctrl required
        custom-validator="passwordCheckConfirmation" v-model="passwordCheck"
        :class="{
          input: true,
          'is-danger': validation.passwordCheck.$invalid && validation.$submitted
        }"
      >
      <span class="help is-danger" v-if="validation.passwordCheck.$invalid && validation.$submitted">
        Password confirmation must match
      </span>
    </p>

    <p class="control">
      <button class="button is-primary" type="submit">Reset Password</button>
    </p>
  </form>
</template>

<script>
export default {
  data () {
    return {
      validation: null,
      password: '',
      passwordCheck: ''
    }
  },

  ready () {
    this.$('form input').get(0).focus()
  },

  methods: {
    onSubmit () {
      if (this.validation.$valid) {
        this.$emit('data', { password: this.password })
      } else {
        this.$('form .vf-invalid').get(0).focus()
      }
    },

    passwordCheckConfirmation (val) {
      return (val === this.password)
    }
  }
}
</script>
