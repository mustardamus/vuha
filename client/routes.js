module.exports = {
  '/': {
    name: 'home',
    component: require('./pages/Home.vue')
  },

  '/users': {
    name: 'users',
    component: require('./pages/Users.vue')
  },

  '/users/:id': {
    name: 'user',
    component: require('./pages/User.vue')
  },

  '/register': {
    name: 'register',
    component: require('./pages/Register.vue')
  },

  '/login': {
    name: 'login',
    component: require('./pages/Login.vue')
  }
}
