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
        .set('Authorization', 'eyJhbGciOiJIUzI1NiJ9.aWQ.kh21pp6WoA3w0taou9dUy4lvOAkfzp2otuIsFR19jvI') // TODO replace me with real one
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
