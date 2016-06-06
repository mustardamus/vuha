import $ from 'cash-dom'

export default {
  methods: {
    $ (selector) {
      return $(selector, this.$el)
    }
  }
}
