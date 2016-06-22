<template>
  <user-show :user="user" @delete="onDelete"></user-show>
</template>

<script>
export default {
  components: {
    UserShow: require('../components/UserShow.vue')
  },

  watch: {
    '$root.user': 'onChange'
  },

  data () {
    return {
      user: this.$root.user
    }
  },

  ready () {
    this.$root.getUser(this.$route.params.username)
  },

  methods: {
    onChange (val) {
      this.user = val
    },

    onDelete (userId) {
      this.$root.deleteUser(userId)
    }
  }
}
</script>
