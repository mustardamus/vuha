<style lang="sass">
@import "../node_modules/bulma/bulma/utilities/utilities"
@import "../node_modules/bulma/bulma/config/variables"
@import "../node_modules/bulma/bulma/config/generated-variables"
@import "../node_modules/bulma/bulma/base/base"
@import "../node_modules/bulma/bulma/elements/elements"
@import "../node_modules/bulma/bulma/components/components"
@import "../node_modules/bulma/bulma/layout/layout"
</style>

<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>

    <loading-overlay-container></loading-overlay-container>
    <notify-container></notify-container>
  </div>
</template>

<script>
import State from './state.js'
import Actions from './actions.js'
import LogDataChangeMixin from './mixins/logDataChange.js'

export default {
  data () { return State },
  methods: Actions,
  mixins: [LogDataChangeMixin],

  components: {
    NavBar: require('./components/NavBar.vue'),
    LoadingOverlayContainer: require('./containers/LoadingOverlayContainer.vue'),
    NotifyContainer: require('./containers/NotifyContainer.vue')
  },

  ready () {
    if (process.env.NODE_ENV === 'development') {
      this.$logDataChange()
    }

    this.ready()
  }
}
</script>
