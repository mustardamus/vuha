<template>
  <post-list :posts="posts"></post-list>
</template>

<script>
export default {
  components: {
    PostList: require('../components/PostList.vue')
  },

  data () {
    return {
      posts: this.$root.posts
    }
  },

  watch: {
    '$root.posts': 'onChange'
  },

  ready () {
    this.$root.getPosts()
  },

  methods: {
    onChange (val) {
      this.posts = val
    }
  }
}
</script>
