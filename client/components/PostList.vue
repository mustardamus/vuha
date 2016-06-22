<style lang="sass">

</style>

<template>
  <div class="post-list">
    <ul v-for="post in posts | orderBy 'createdAt' -1">
      <a v-link="{ name: 'post', params: { id: post._id }}">
        {{post.title}}
      </a>
    </ul>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    posts: Array
  },

  filters: {
    moment (val) {
      return moment(val).format('MM-DD-YYYY kk:mm:ss')
    }
  }
}
</script>
