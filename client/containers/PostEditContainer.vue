<template>
  <post-form
    :title="post.title"
    :excerpt="post.excerpt"
    :markdown="post.markdown"
    :button-text="buttonText"
    @data="onData"
  ></post-form>
</template>

<script>
export default {
  components: {
    PostForm: require('../components/PostForm.vue')
  },

  watch: {
    '$root.post': 'onPostChange'
  },

  data () {
    return {
      buttonText: 'Update',
      post: this.$root.post
    }
  },

  ready () {
    this.$root.getPost(this.$route.params.slug)
  },

  methods: {
    onData (data) {
      this.$root.updatePost(this.post._id, data)
    },

    onPostChange (val) {
      this.post = val
    }
  }
}
</script>
