const state = {
  username: null,
  loggedIn: false,
  role: null,
  permissions: []
}

const getters = {
  is: (state) => (role) => state.role == role,
  can: (state) => (permission) => state.permissions.includes(permission)
}

const mutations = {
  LOGIN (state, user) {
    state.loggedIn = true
    state.username = user.username
    state.role = user.role
    state.permissions = user.permissions
  },
  LOGOUT (state) {
    state.username = null
    state.loggedIn = false
    state.role = null
    state.permissions = []
  }
}

export default {
  state,
  getters,
  mutations
}
