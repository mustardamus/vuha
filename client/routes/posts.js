module.exports = {
  '/posts': {
    name: 'posts',
    component: require('../pages/Posts.vue')
  },

  '/posts/new': {
    name: 'postsNew',
    component: require('../pages/PostsNew.vue')
  }
}
