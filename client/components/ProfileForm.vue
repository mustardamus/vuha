<style lang="sass">

</style>

<template>
  <form class="profile-form" v-form name="validation" @submit.prevent="onSubmit">
    <label class="label" for="username">Username</label>
    <p class="control">
      <input id="username" type="text" name="username" placeholder="Username"
        v-form-ctrl required v-model="username"
        :class="{
          input: true,
          'is-danger': validation.username.$invalid && validation.$submitted
        }"
      >
      <span class="help is-danger"
        v-if="validation.username.$invalid && validation.$submitted"
      >
        Username is required
      </span>
    </p>

    <label class="label" for="email">E-Mail</label>
    <p class="control">
      <input id="email" type="email" name="email" placeholder="your@email.com"
        v-form-ctrl required v-model="email"
        :class="{
          input: true,
          'is-danger': validation.email.$invalid && validation.$submitted
        }"
      >
      <span class="help is-danger"
        v-if="validation.email.$invalid && validation.$submitted"
      >
        <template v-if="validation.email.$error.required">
          E-Mail address is required
        </template>
        <template v-if="validation.email.$error.email">
          Must be a valid E-Mail address
        </template>
      </span>
    </p>

    <label class="label" for="old-password">Old Password</label>
    <p class="control">
      <input id="old-password" type="password" name="oldPassword"
        placeholder="********" v-model="oldPassword"
        :class="{
          input: true,
          'is-danger': isOldPasswordSet && !isNewPasswordSet && validation.$submitted
        }"
      >
      <span :class="{
        help: true,
        'is-danger': isOldPasswordSet && !isNewPasswordSet && validation.$submitted
      }">
        Please provide your old Password to change to a new one, leave blank if
        you don't want to change it
      </span>
    </p>

    <label class="label" for="password">New Password</label>
    <p class="control">
      <input id="password" type="password" name="password" placeholder="********"
        v-form-ctrl minlength="6" v-model="password"
        :class="{
          input: true,
          'is-danger': ((!isOldPasswordSet && isNewPasswordSet) || validation.password.$invalid) && validation.$submitted
        }"
      >
      <span class="help is-danger"
        v-if="((!isOldPasswordSet && isNewPasswordSet) || validation.password.$invalid) && validation.$submitted"
      >
        <template v-if="!isOldPasswordSet && isNewPasswordSet">
          Please provide your old Password
        </template>
        <template v-if="validation.password.$error.minlength">
          Password must be at least 6 characters long
        </template>
      </span>
    </p>

    <label class="label" for="passwordCheck">New Password Confirmation</label>
    <p class="control">
      <input id="passwordCheck" type="password" name="passwordCheck"
        placeholder="********" v-form-ctrl
        custom-validator="passwordCheckConfirmation" v-model="passwordCheck"
        :class="{
          input: true,
          'is-danger': (!isPasswordConfirmationSet || validation.passwordCheck.$invalid) && validation.$submitted
        }"
      >
      <span class="help is-danger"
        v-if="(!isPasswordConfirmationSet || validation.passwordCheck.$invalid) && validation.$submitted"
      >
        Password confirmation must match
      </span>
    </p>

    <div class="columns">
      <div class="column control">
        <button class="button is-primary" type="submit">Update</button>
      </div>
      <div class="column">
        <a @click="onDeleteClick" class="button is-small is-danger">
          Delete my Profil
        </a>
      </div>
    </div>
  </form>
</template>

<script>
import CashMixin from '../mixins/cash.js'

export default {
  mixins: [CashMixin],

  props: {
    username: String,
    email: String
  },

  data () {
    return {
      validation: null,
      password: '',
      oldPassword: '',
      passwordCheck: ''
    }
  },

  computed: {
    isOldPasswordSet () {
      return this.oldPassword.length
    },

    isNewPasswordSet () {
      return this.password.length
    },

    isPasswordConfirmationSet () {
      return this.passwordCheckConfirmation(this.passwordCheck)
    },

    isFormValid () {
      let valid = true

      if (this.isOldPasswordSet && !this.isNewPasswordSet) {
        valid = false
      }

      if (!this.isOldPasswordSet && this.isNewPasswordSet) {
        valid = false
      }

      if (this.isOldPasswordSet && (this.password !== this.passwordCheck)) {
        valid = false
      }

      return (valid && this.validation.$valid)
    }
  },

  ready () {
    this.$('form input').get(0).focus()
  },

  methods: {
    onSubmit () {
      if (this.isFormValid) {
        let data = {
          username: this.username,
          email: this.email
        }

        if (this.oldPassword.length) {
          data.password = this.password
          data.oldPassword = this.oldPassword
        }

        this.$emit('data', data)
      } else {
        this.$('input.is-danger').get(0).focus()
      }
    },

    passwordCheckConfirmation (val) {
      return (val === this.password)
    },

    onDeleteClick () {
      if (confirm('Are you sure?')) {
        this.$root.deleteCurrentUser()
      }
    }
  }
}
</script>
