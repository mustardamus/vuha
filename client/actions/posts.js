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

  getPost (postId) {
    this.$request('get', 'posts/' + postId, (err, res) => {
      if (err) {
        this.$root.addNotifyError(err)
      } else {
        if (res) {
          this.$root.post = res
        } else {
          this.$root.addNotifyMessage('danger', 'Can not find post')
        }
      }
    })
  },

  createPost (data) {
    this.$request('post', 'posts', data, (err, res) => {
      if (err) {
        this.$root.addNotifyError(err)
      } else {
        this.$root.addNotifyMessage('success', 'Post created')
        this.$router.go({ name: 'post', params: { id: res._id } })
      }
    })
  }
}
