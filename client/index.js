import Vue from 'vue'
import VueRouter from 'vue-router'
import VueForm from 'vue-form'

import App from './App.vue'
import Routes from './routes.js'

import RequestMixin from './mixins/request.js'
import CashMixin from './mixins/cash.js'

Vue.use(VueRouter)
Vue.use(VueForm)

Vue.mixin(RequestMixin)
Vue.mixin(CashMixin)

let $root = Vue.extend(App)
let router = new VueRouter()

router.map(Routes)
router.start($root, '#app')
