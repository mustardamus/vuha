export default {
  methods: {
    $logDataChange () {
      for (let key in this.$data) {
        this.$watch(key, (oldVal, newVal) => {
          console.log('State of "' + key + '" changed from', newVal, 'to', oldVal)
        }, {
          deep: true
        })
      }
    }
  }
}
