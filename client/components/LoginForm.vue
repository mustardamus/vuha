<style lang="sass">

</style>

<template>
  <form class="login-form" v-form name="validation" @submit.prevent="onSubmit">
    <label class="label" for="username">Username</label>
    <p class="control">
      <input id="username" type="text" name="username" placeholder="Username"
        :class="{ input: true, 'is-danger': validation.username.$invalid && validation.$submitted }"
        v-form-ctrl required v-model="username"
      >
      <span class="help is-danger" v-if="validation.username.$invalid && validation.$submitted">
        Username is required
      </span>
    </p>

    <label class="label" for="password">Password</label>
    <p class="control">
      <input id="password" type="password" name="password" placeholder="********"
        :class="{ input: true, 'is-danger': validation.password.$invalid && validation.$submitted }"
        v-form-ctrl required v-model="password"
      >
      <span class="help is-danger" v-if="validation.password.$invalid && validation.$submitted">
        Password is required
      </span>
    </p>

    <p class="control">
      <button class="button is-primary" type="submit">Login</button>
    </p>

    <a @click="onForgotClick">
      Forgot that password brah
    </a>
  </form>
</template>

<script>
import CashMixin from '../mixins/cash.js'

export default {
  mixins: [CashMixin],

  props: {
    username: String,
    password: String
  },

  data () {
    return {
      validation: null
    }
  },

  ready () {
    this.$('form input').get(0).focus()
  },

  methods: {
    onSubmit () {
      if (this.validation.$valid) {
        this.$emit('data', {
          username: this.username,
          password: this.password
        })
      } else {
        this.$('form .vf-invalid').get(0).focus()
      }
    },

    onForgotClick () {
      this.$root.sendResetToken('test@emailx.com')
    }
  }
}
</script>
