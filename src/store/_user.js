export default {
  state: {
    username: null,
    loggedIn: false,
    role: null,
    permissions: []
  },

  mutations: {
    SET_USER (state, user) {
      state.loggedIn = true
      state.username = user.username
      state.role = user.role
      state.permissions = user.permissions
    },

    RESET_USER (state) {
      state.username = null
      state.loggedIn = false
      state.role = null
      state.permissions = []
    }
  },

  getters: {
    username: state => state.username,
    is: (state) => (role) => state.role == role,
    can: (state) => (permission) => state.permissions.includes(permission)
  },

  actions: {
    
  }
}