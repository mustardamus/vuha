<template>
  <post-show :post="post" :is-admin="isAdmin" @delete="onDelete"></post-show>
</template>

<script>
export default {
  components: {
    PostShow: require('../components/PostShow.vue')
  },

  watch: {
    '$root.post': 'onChange',
    '$root.currentUser': 'onUserChange'
  },

  data () {
    return {
      post: this.$root.post,
      isAdmin: (this.$root.currentUser.role === 'SUPER_ADMIN' || this.$root.currentUser.role === 'ADMIN')
    }
  },

  ready () {
    this.$root.getPost(this.$route.params.slug)
  },

  methods: {
    onChange (val) {
      this.post = val
    },

    onUserChange (user) {
      if (user) {
        this.isAdmin = (user.role === 'SUPER_ADMIN' || user.role === 'ADMIN')
      } else {
        this.isAdmin = false
      }
    },

    onDelete (postId) {
      this.$root.deletePost(postId)
    }
  }
}
</script>
