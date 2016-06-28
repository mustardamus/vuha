<style lang="sass">

</style>

<template>
  <template v-if="isAdmin">
    <a class="button is-primary" v-link="{ name: 'postEdit', params: { slug: post.slug }}">
      Edit Post
    </a>

    <a class="button is-danger" @click="onDeleteClick">
      Delete Post
    </a>
  </template>

  <h1 class="title">{{post.title}} by {{post.user.username}}</h1>
  <h2 class="subtitle">{{post.excerpt}}</h2>

  <section class="section">
    {{{post.html}}}
  </section>
</template>

<script>
export default {
  props: {
    post: Object,
    isAdmin: Boolean
  },

  methods: {
    onDeleteClick () {
      if (confirm('Are you sure?')) {
        this.$emit('delete', this.post._id)
      }
    }
  }
}
</script>
