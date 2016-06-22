<style lang="sass">

</style>

<template>
  <h1 class="title">{{post.title}}</h1>
  <h2 class="subtitle">{{post.excerpt}}</h2>

  <section class="section">
    {{{post.html}}}
  </section>
</template>

<script>
export default {
  props: {
    post: Object
  },

  methods: {
  }
}
</script>
