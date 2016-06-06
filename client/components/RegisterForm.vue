<style lang="sass">

</style>

<template>
  <form class="register-form" v-form name="validation" @submit.prevent="onSubmit">
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

    <label class="label" for="email">E-Mail</label>
    <p class="control">
      <input id="email" type="email" name="email" placeholder="your@email.com"
        :class="{ input: true, 'is-danger': validation.email.$invalid && validation.$submitted }"
        v-form-ctrl required v-model="email"
      >
      <span class="help is-danger" v-if="validation.email.$invalid && validation.$submitted">
        <template v-if="validation.email.$error.required">
          E-Mail address is required
        </template>
        <template v-if="validation.email.$error.email">
          Must be a valid E-Mail address
        </template>
      </span>
    </p>

    <label class="label" for="password">Password</label>
    <p class="control">
      <input id="password" type="password" name="password" placeholder="********"
        :class="{ input: true, 'is-danger': validation.password.$invalid && validation.$submitted }"
        v-form-ctrl required minlength="6" v-model="password"
      >
      <span class="help is-danger" v-if="validation.password.$invalid && validation.$submitted">
        <template v-if="validation.password.$error.required">
          Password is required
        </template>
        <template v-if="validation.password.$error.minlength">
          Password must be at least 6 characters long
        </template>
      </span>
    </p>

    <label class="label" for="passwordCheck">Password Confirmation</label>
    <p class="control">
      <input id="passwordCheck" type="password" name="passwordCheck" placeholder="********"
        :class="{ input: true, 'is-danger': validation.passwordCheck.$invalid && validation.$submitted }"
        v-form-ctrl required custom-validator="passwordCheckConfirmation" v-model="passwordCheck"
      >
      <span class="help is-danger" v-if="validation.passwordCheck.$invalid && validation.$submitted">
        Password confirmation must match
      </span>
    </p>

    <p class="control">
      <button class="button is-primary" type="submit">Register</button>
    </p>
  </form>
</template>

<script>
export default {
  props: {
    username: String,
    email: String,
    password: String
  },

  data () {
    return {
      validation: null,
      passwordCheck: ''
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
          email: this.email,
          password: this.password
        })
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
