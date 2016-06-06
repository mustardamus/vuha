<template>
  <user-list
    :users="users"
    @show="onShow"
    @delete="onDelete"
  ></user-list>
</template>

<script>
export default {
  components: {
    UserList: require('../components/UserList.vue')
  },

  data () {
    return {
      users: this.$root.users
    }
  },

  watch: {
    '$root.users': 'onChange'
  },

  methods: {
    onChange (val) {
      this.users = val
    },

    onShow (userId) {
      this.$router.go({
        name: 'user',
        params: { id: userId }
      })
    },

    onDelete (userId) {
      this.$root.deleteUser(userId)
    }
  }
}
</script>
