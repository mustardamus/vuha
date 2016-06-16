<template>
  <profile-form
    :username="user.username"
    :email="user.email"
    @data="onData"
    @delete="onDelete"
  ></profile-form>
</template>

<script>
export default {
  components: {
    ProfileForm: require('../components/ProfileForm.vue')
  },

  data () {
    return {
      user: this.$root.currentUser
    }
  },

  watch: {
    '$root.currentUser': 'onUserChange'
  },

  methods: {
    onUserChange (user) {
      this.user = user
    },

    onData (data) {
      this.$root.updateCurrentUser(data)
    },

    onDelete () {
      this.$root.deleteCurrentUser()
    }
  }
}
</script>
