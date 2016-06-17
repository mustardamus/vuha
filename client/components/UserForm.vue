<template>
  <div class="userForm">
    <h1 class="title">{{user.username}}</h1>
    <h2 class="subtitle">{{user._id}}</h2>

    <form @submit.prevent="onSubmit">
      <p class="control">
        <span class="select">
          <select v-model="user.role">
            <option v-for="role in roles" v-bind:value="role">
              {{role}}
            </option>
          </select>
        </span>
      </p>

      <p class="control">
        <button class="button is-primary" type="submit">Update</button>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    roles: Array
  },

  methods: {
    onSubmit () {
      this.$emit('data', this.user)
    }
  }
}
</script>
