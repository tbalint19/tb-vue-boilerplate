const namespaced = true

const state = () => { return {
    username: null,
    loggedIn: false,
    role: null,
    permissions: []
  }
}

const mutations = {
  SET (state, user) {
    state.loggedIn = true
    state.username = user.username
    state.role = user.role
    state.permissions = user.permissions
  },

  DEL (state) {
    state.username = null
    state.loggedIn = false
    state.role = null
    state.permissions = []
  }
}

const getters = {
  username: state => state.username,
  loggedIn: state => state.loggedIn,
  is: (state) => (role) => state.role == role,
  can: (state) => (permission) => state.permissions.includes(permission)
}

const actions = {
  set ({ commit }, user) {
    if (user)
      commit('SET', user)
    else
      commit('DEL')
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
