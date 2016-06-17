<style lang="sass">
.userList
  li
    margin-bottom: 20px
</style>

<template>
  <div class="user-list columns">
    <div class="column is-one-quarter" v-for="user in users | orderBy 'createdAt' -1">
      <div class="card is-fullwidth">
        <header class="card-header">
          <p class="card-header-title">{{user.username}}</p>
        </header>
        <div class="card-content">
          <ul class="content">
            <li>ID: {{user._id}}</li>
            <li>E-Mail: {{user.email}}</li>
            <li>Role: {{user.role}}</li>
            <li>Createt at: {{user.createdAt | moment}}</li>
            <li>Last login: {{user.lastLogin | moment}}</li>
          </ul>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" v-link="{ name: 'user', params: { id: user._id }}">View</a>
          <a class="card-footer-item" v-link="{ name: 'userEdit', params: { id: user._id }}">Edit</a>
          <a class="card-footer-item" @click="onDelete(user)">Delete</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    users: Array
  },

  filters: {
    moment (val) {
      return moment(val).format('MM-DD-YYYY kk:mm:ss')
    }
  },

  methods: {
    onDelete (user) {
      if (confirm('Are you sure?')) {
        this.$emit('delete', user._id)
      }
    }
  }
}
</script>
