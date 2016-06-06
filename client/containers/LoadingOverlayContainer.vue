<template>
  <loading-overlay :is-active="isActive"></loading-overlay>
</template>

<script>
export default {
  components: {
    LoadingOverlay: require('../components/LoadingOverlay.vue')
  },

  data () {
    return {
      isActive: this.$root.isLoading
    }
  },

  watch: {
    '$root.isLoading': 'onLoading'
  },

  methods: {
    onLoading (loading) {
      if (loading) {
        this.isActive = true
      } else {
        this.isActive = false
      }
    }
  }
}
</script>
