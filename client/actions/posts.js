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

  getPost (slug) {
    this.$request('get', 'posts/' + slug, (err, res) => {
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
        this.$router.go({ name: 'post', params: { slug: res.slug } })
      }
    })
  },

  updatePost (postId, data) {
    this.$request('put', 'posts/' + postId, data, (err, res) => {
      if (err) {
        this.$root.addNotifyError(err)
      } else {
        this.$root.post = res
        this.$root.addNotifyMessage('success', 'Updated successfully')
      }
    })
  },
}
