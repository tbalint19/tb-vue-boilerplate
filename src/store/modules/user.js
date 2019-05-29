import { reportLogout } from '../../util/notify'

const namespaced = true

const state = () => { return {
    username: null,
    loggedIn: false,
    role: null,
    permissions: []
  }
}

const mutations = {
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
}

const getters = {
  username: state => state.username,
  loggedIn: state => state.loggedIn,
  is: (state) => (role) => state.role == role,
  can: (state) => (permission) => state.permissions.includes(permission)
}

const actions = {
  logout(context) {
    context.commit('RESET_USER')
    this.$app.$router.push("/login")
    reportLogout(this.$app)
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
