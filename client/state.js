export default {
  currentUser: false, // stores the logged in user information
  token: false,       // stores the token of the logged in user
  isLoading: false,   // indicate if (ajax) is loading
  notifyMessages: [], // temporarely store global notify messages
  user: {},           // information about specific user
  users: [],          // array of all users
  post: {},           // information about specific post
  posts: []           // array of all posts
}
