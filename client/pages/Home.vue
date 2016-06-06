<style lang="sass">

</style>

<template>
  homepage wa
</template>

<script>
export default {
  components: {

  },

  data () {
    return {

    }
  },

  ready () {
    this.$request('post', 'users', { username: '', password: '123' }, (err, res) => {
      console.log(err, res)
    })
  },

  methods: {

  }
}
</script>
