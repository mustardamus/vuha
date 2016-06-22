<template>
  <post-show :post="post" :is-admin="isAdmin"></post-show>
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
      isAdmin: false
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
    }
  }
}
</script>
