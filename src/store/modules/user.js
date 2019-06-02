import { parse } from '@/util/jwt'

const namespaced = true

const state = () => { return {
    username: null,
    isLoggedIn: false,
    role: null,
    permissions: []
  }
}

const mutations = {
  SET (state, user) {
    state.isLoggedIn = true
    state.username = user.username
    state.role = user.role
    state.permissions = user.permissions
  },

  DEL (state) {
    state.username = null
    state.isLoggedIn = false
    state.role = null
    state.permissions = []
  }
}

const getters = {
  username: state => state.username,
  isLoggedIn: state => state.isLoggedIn,
  is: (state) => (role) => state.role == role,
  can: (state) => (permission) => state.permissions.includes(permission)
}

const actions = {
  set ({ commit }, jwt) {
    let user = parse(jwt)
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
