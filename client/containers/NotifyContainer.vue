<template>
  <notify
    :messages="messages"
    @remove="onRemove"
  ></notify>
</template>

<script>
export default {
  components: {
    Notify: require('../components/Notify.vue')
  },

  data () {
    return {
      messages: this.$root.notifyMessages,
      timeout: 10000
    }
  },

  watch: {
    messages: 'onMessagesChange'
  },

  methods: {
    onMessagesChange () {
      for (let message of this.messages) {
        if (!message.timeoutId) {
          message.timeoutId = this.removeMessageAfterTimeout(message)
        }
      }
    },

    removeMessageAfterTimeout (message) {
      return setTimeout(() => {
        this.$root.removeNotifyMessage(message)
      }, this.timeout)
    },

    onRemove (message) {
      this.$root.removeNotifyMessage(message)
      clearTimeout(message.timeoutId)
    }
  }
}
</script>
