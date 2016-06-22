<template>
  <post-form :button-text="buttonText" @data="onData"></post-form>
</template>

<script>
export default {
  components: {
    PostForm: require('../components/PostForm.vue')
  },

  data () {
    return {
      buttonText: 'Create'
    }
  },

  methods: {
    onData (data) {
      this.$root.createPost(data)
    }
  }
}
</script>
