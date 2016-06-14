<template>
  <profile-form
    :username="user.username"
    :email="user.email"
    @data="onData"
  ></profile-form>
</template>

<script>
export default {
  components: {
    ProfileForm: require('../components/ProfileForm.vue')
  },

  data () {
    return {
      user: this.$root.user
    }
  },

  watch: {
    '$root.user': 'onUserChange'
  },

  methods: {
    onUserChange (user) {
      this.user = user
    },

    onData (data) {
      this.$root.updateCurrentUser(data)
    }
  }
}
</script>
