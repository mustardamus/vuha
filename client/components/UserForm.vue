<template>
  <div class="userForm">
    <form @submit.prevent="onSubmit">
      <label class="label" for="userForm-username">Userame</label>
      <p class="control">
        <input v-model="username" class="input" type="text" placeholder="Username" id="userForm-username">
      </p>

      <label class="label" for="userForm-password">Password</label>
      <p class="control">
        <input v-model="password" class="input" type="password" placeholder="********" id="userForm-password">
      </p>

      <p class="control">
        <button class="button is-primary" type="submit">{{buttonText}}</button>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    username: String,
    password: String,
    buttonText: {
      type: String,
      default: 'Save'
    },
    resetAfterData: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    onSubmit () {
      this.$emit('data', {
        username: this.username,
        password: this.password
      })

      if (this.resetAfterData) {
        this.username = ''
        this.password = ''
      }
    }
  }
}
</script>
