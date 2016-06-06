<style lang="sass">

</style>

<template>
  <user-list-container></user-list-container>
</template>

<script>
export default {
  components: {
    UserListContainer: require('../containers/UserListContainer.vue')
  },

  ready () {
    this.$root.getUsers()
  },

  methods: {

  }
}
</script>
