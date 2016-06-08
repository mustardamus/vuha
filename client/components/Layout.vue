<style lang="sass">

</style>

<template>
  <nav-bar></nav-bar>
  <router-view></router-view>

  <loading-overlay-container></loading-overlay-container>
  <notify-container></notify-container>
</template>

<script>
export default {
  components: {
    NavBar: require('../components/NavBar.vue'),
    LoadingOverlayContainer: require('../containers/LoadingOverlayContainer.vue'),
    NotifyContainer: require('../containers/NotifyContainer.vue')
  }
}
</script>
