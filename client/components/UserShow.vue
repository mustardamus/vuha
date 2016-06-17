<style lang="sass">

</style>

<template>
  <h1 class="title">{{user.username}}</h1>
  <h2 class="subtitle">{{user._id}}</h2>

  <ul>
    <li>E-Mail: {{user.email}}</li>
    <li>Role: {{user.role}}</li>
    <li>Createt at: {{user.createdAt}}</li>
    <li>Last login: {{user.lastLogin}}</li>
  </ul>

  <div class="control is-grouped">
    <p class="control">
      <a class="button is-primary" v-link="{ name: 'userEdit', params: { id: user._id }}">
        Edit
      </a>
    </p>
    <p class="control">
      <a class="button is-danger" @click="onDeleteClick">
        Delete
      </a>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    user: Object
  },

  methods: {
    onDeleteClick () {
      if (confirm('Are you sure')) {
        this.$emit('delete', this.user._id)
      }
    }
  }
}
</script>
