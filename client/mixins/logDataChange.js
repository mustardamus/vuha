const trimVal = function (val) { // eslint-disable-line
  switch (typeof val) {
    case 'string':
      if (val.length >= 100) {
        return val.substr(0, 100) + '...'
      }

      break
    default:
      return val
  }
}

export default {
  methods: {
    $logDataChange () {
      for (let key in this.$data) {
        this.$watch(key, (oldVal, newVal) => {
          // oldVal = trimVal(oldVal)
          // newVal = trimVal(newVal)

          console.log('State of "' + key + '" changed from', newVal, 'to', oldVal)
        }, {
          deep: true
        })
      }
    }
  }
}
