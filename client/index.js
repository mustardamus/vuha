import _ from 'lodash'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueForm from 'vue-form'
const Bulk = require('bulk-require')

import App from './App.vue'

Vue.use(VueRouter)
Vue.use(VueForm)

const $root = Vue.extend(App)
const router = new VueRouter()
const routesObj = Bulk(__dirname, [ 'routes/*.js']).routes
let routes = {}

for (let routeKey in routesObj) {
  _.assign(routes, routesObj[routeKey])
}

router.map(routes)
router.start($root, '#app')
