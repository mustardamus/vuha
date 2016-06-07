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
import _ from 'lodash'
const Bulk = require('bulk-require')

import State from './state.js'
import LogDataChangeMixin from './mixins/logDataChange.js'

const actionsObj = Bulk(__dirname, [ 'actions/*.js']).actions
let actions = {}

for (let actionKey in actionsObj) {
  _.assign(actions, actionsObj[actionKey])
}

export default {
  data () { return State },
  methods: actions,
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
  }
}
</script>
