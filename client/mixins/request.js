import superagent from 'superagent'

export default {
  methods: {
    $request (verb, url, query, cb) {
      if (typeof query === 'function') {
        cb = query
        query = {}
      }

      superagent[verb]('/' + url)
        .set('Accept', 'application/json')
        .query(query)
        .end((err, response) => {
          if (err) {
            cb(err)
          } else {
            cb(null, response.body)
          }
        })
    }
  }
}
