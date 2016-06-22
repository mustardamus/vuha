<template>
  <user-form :user="user" :roles="roles" @data="onData"></user-form>
</template>

<script>
export default {
  components: {
    UserForm: require('../components/UserForm.vue')
  },

  watch: {
    '$root.user': 'onChange'
  },

  data () {
    return {
      user: this.$root.user,
      roles: ['SUPER_ADMIN', 'ADMIN', 'USER']
    }
  },

  ready () {
    this.$root.getUser(this.$route.params.username)
  },

  methods: {
    onChange (val) {
      this.user = val
    },

    onData (data) {
      this.$root.updateUser(this.user._id, {
        role: data.role
      })
    }
  }
}
</script>
