module.exports = {
  getPosts () {
    this.$request('get', 'posts', (err, res) => {
      if (err) {
        this.$root.addNotifyMessage('danger', 'Can not load posts')
      } else {
        this.$root.posts = res
      }
    })
  },

  createPost (data) {
    this.$request('post', 'posts', data, (err, res) => {
      if (err) {
        this.$root.addNotifyError(err)
      } else {
        this.$root.addNotifyMessage('success', 'Post created')
        console.log(res)
      }
    })
  }
}
