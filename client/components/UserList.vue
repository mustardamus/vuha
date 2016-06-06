<style lang="sass">
.userList
  li
    margin-bottom: 20px
</style>

<template>
  <ul class="userList">
    <li v-for="user in users | orderBy 'createdAt' -1">
      <h1 class="title is-3 is-marginless">{{user.username}}</h1>
      <p>
        {{user._id}}

        <a v-link="{ name: 'user', params: { id: user._id }}">Show</a>
        <a @click="onDelete(user)">Delete</a>
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    users: Array
  },

  methods: {
    onDelete (user) {
      this.$emit('delete', user._id)
    }
  }
}
</script>
