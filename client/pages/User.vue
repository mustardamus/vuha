<style lang="sass">

</style>

<template>
  <h1 class="title is-1">{{user._id}} <a v-link="{ name: 'users' }">Users Page</a></h1>

  <user-form-edit-container></user-form-edit-container>
</template>

<script>
export default {
  watch: {
    '$root.currentUser': 'onChange'
  },

  data () {
    return {
      user: this.$root.currentUser
    }
  },

  components: {
    UserFormEditContainer: require('../containers/UserFormEditContainer.vue')
  },

  ready () {
    this.$root.getUser(this.$route.params.id)
  },

  methods: {
    onChange (val) {
      this.user = val
    }
  }
}
</script>
