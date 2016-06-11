module.exports = {
  '/users': {
    name: 'users',
    component: require('../pages/Users.vue')
  },

  '/users/:id': {
    name: 'user',
    component: require('../pages/User.vue')
  },

  '/register': {
    name: 'register',
    component: require('../pages/Register.vue')
  },

  '/login': {
    name: 'login',
    component: require('../pages/Login.vue')
  },

  '/profile': {
    name: 'profile',
    component: require('../pages/Profile.vue')
  }
}
