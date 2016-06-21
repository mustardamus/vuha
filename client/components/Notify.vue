<style lang="sass">
.notify
  position: absolute
  top: 70px
  right: 20px
  width: 40%
</style>

<template>
  <div class="notify">
    <div v-for="message in messages" class="notification is-{{message.type || 'info'}}">
      <button class="delete" @click="onCloseClick(message)"></button>
      {{message.content}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messages: Array
  },

  methods: {
    onCloseClick (message) {
      this.$emit('remove', message)
    }
  }
}
</script>
