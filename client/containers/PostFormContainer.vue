<template>
  <post-form
    :title="title"
    :content="content"
    @data="onData"
  ></post-form>
</template>

<script>
export default {
  components: {
    PostForm: require('../components/PostForm.vue')
  },

  methods: {
    onData (data) {
      this.$root.createPost(data)
    }
  }
}
</script>
