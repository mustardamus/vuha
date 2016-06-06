<template>
  <user-form
    :username="user.username"
    :password="user.password"
    :button-text="'Update'"
    :reset-after-data="false"
    @data="onData"
  ></user-form>
</template>

<script>
export default {
  components: {
    UserForm: require('../components/UserForm.vue')
  },

  data () {
    return {
      user: this.$root.user
    }
  },

  methods: {
    onData (data) {
      this.$root.updateUser(this.$route.params.id, data)
    }
  }
}
</script>
