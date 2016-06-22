import _ from 'lodash'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueForm from 'vue-form'
const Bulk = require('bulk-require')
import App from './App.vue'
import CashMixin from './mixins/cash.js'

Vue.use(VueRouter)
Vue.use(VueForm)
Vue.mixin(CashMixin)

const $root = Vue.extend(App)
const router = new VueRouter({ linkActiveClass: 'is-active' })
const routesObj = Bulk(__dirname, [ 'routes/*.js']).routes
let routes = {}

for (let routeKey in routesObj) {
  _.assign(routes, routesObj[routeKey])
}

router.map(routes)
router.start($root, '#app')
