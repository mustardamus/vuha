<template>
  <layout></layout>
</template>

<script>
export default {
  components: {
    Layout: require('../components/Layout.vue')
  },

  ready () {
    if (this.$root.getUserToken()) {
      this.$root.getCurrentUser()
    }
  }
}
</script>
