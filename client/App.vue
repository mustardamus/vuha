<style lang="sass">
@import "../node_modules/bulma/bulma"
@import "../node_modules/font-awesome/scss/font-awesome"
</style>

<template>
  <div id="app">
    <layout-container></layout-container>
  </div>
</template>

<script>
import _ from 'lodash'
const Bulk = require('bulk-require')

import State from './state.js'
import RequestMixin from './mixins/request.js'
import LogDataChangeMixin from './mixins/logDataChange.js'

const actionsObj = Bulk(__dirname, [ 'actions/*.js']).actions
let actions = {}

for (let actionKey in actionsObj) {
  _.assign(actions, actionsObj[actionKey])
}

export default {
  data () { return State },
  methods: actions,
  mixins: [LogDataChangeMixin, RequestMixin],
  components: {
    LayoutContainer: require('./containers/LayoutContainer.vue')
  },

  ready () {
    if (process.env.NODE_ENV === 'development') {
      this.$logDataChange()
    }
  }
}
</script>
