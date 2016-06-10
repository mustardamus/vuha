<style lang="sass">

</style>

<template>
  <nav-bar-container></nav-bar-container>
  <router-view></router-view>

  <loading-overlay-container></loading-overlay-container>
  <notify-container></notify-container>
</template>

<script>
export default {
  components: {
    NavBarContainer: require('../containers/NavBarContainer.vue'),
    LoadingOverlayContainer: require('../containers/LoadingOverlayContainer.vue'),
    NotifyContainer: require('../containers/NotifyContainer.vue')
  }
}
</script>
