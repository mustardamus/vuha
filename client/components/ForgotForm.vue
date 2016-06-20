<style lang="sass">

</style>

<template>
  <form class="forgot-form" v-form name="validation" @submit.prevent="onSubmit">
    <label class="label" for="usernameOrEmail">Username or E-Mail</label>
    <p class="control">
      <input id="usernameOrEmail" type="text" name="usernameOrEmail" placeholder="Username or your@mail.com"
        :class="{ input: true, 'is-danger': validation.usernameOrEmail.$invalid && validation.$submitted }"
        v-form-ctrl required v-model="usernameOrEmail"
      >
      <span class="help is-danger" v-if="validation.usernameOrEmail.$invalid && validation.$submitted">
        Username or E-Mail is required
      </span>
    </p>

    <p class="control">
      <button class="button is-primary" type="submit">Send Reset E-Mail</button>
    </p>
  </form>
</template>

<script>
import CashMixin from '../mixins/cash.js'

export default {
  mixins: [CashMixin],

  props: {
    usernameOrEmail: String
  },

  data () {
    return {
      validation: null
    }
  },

  methods: {
    onSubmit () {
      if (this.validation.$valid) {
        this.$emit('data', { usernameOrEmail: this.usernameOrEmail })
      } else {
        this.$('form .vf-invalid').get(0).focus()
      }
    }
  }
}
</script>
