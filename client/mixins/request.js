import superagent from 'superagent'

export default {
  methods: {
    $request (verb, url, query, cb) {
      if (typeof query === 'function') {
        cb = query
        query = {}
      }

      let headers = { Accept: 'application/json' }
      let token = this.$root.getUserToken()

      if (token) {
        headers.Authorization = token
      }

      this.$root.isLoading = true

      superagent[verb]('/' + url)
        .set(headers)
        .query(query)
        .end((err, response) => {
          this.$root.isLoading = false

          if (err) {
            cb(err)
          } else {
            cb(null, response.body)
          }
        })
    }
  }
}
