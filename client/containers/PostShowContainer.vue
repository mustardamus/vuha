<template>
  <post-show :post="post"></post-show>
</template>

<script>
export default {
  components: {
    PostShow: require('../components/PostShow.vue')
  },

  watch: {
    '$root.post': 'onChange'
  },

  data () {
    return {
      post: this.$root.post
    }
  },

  ready () {
    this.$root.getPost(this.$route.params.id)
  },

  methods: {
    onChange (val) {
      this.post = val
    }
  }
}
</script>
