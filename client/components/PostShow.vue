<style lang="sass">

</style>

<template>
  <a class="button is-primary" v-link="{ name: 'postEdit', params: { slug: post.slug }}" v-if="isAdmin">
    Edit Post
  </a>

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
  }
}
</script>
