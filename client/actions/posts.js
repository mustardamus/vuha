module.exports = {
  getPosts () {
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
