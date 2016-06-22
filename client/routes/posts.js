module.exports = {
  '/posts': {
    name: 'posts',
    component: require('../pages/Posts.vue')
  },

  '/posts/new': {
    name: 'postsNew',
    component: require('../pages/PostsNew.vue')
  },

  '/posts/:id': {
    name: 'post',
    component: require('../pages/Post.vue')
  }
}
