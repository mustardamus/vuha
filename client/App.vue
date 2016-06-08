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
    <layout></layout>
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
  components: { Layout: require('./components/Layout.vue') },

  ready () {
    if (process.env.NODE_ENV === 'development') {
      this.$logDataChange()
    }
  }
}
</script>
