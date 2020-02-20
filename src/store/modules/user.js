import { parse } from '@/util/jwt'

const namespaced = true

const _state = (content) => () => ({
  email: null,
  isLoggedIn: false,
  role: null,
  permissions: [],
  picture: null,
  firstName: null,
  lastName: null,
})

const _getters = {
  email: (state) => state.email,
  picture: (state) => state.picture,
  firstName: (state) => state.firstName,
  lastName: (state) => state.lastName,
  username: (state) => (state.email ? state.email.split('@')[0] : ''),
  isLoggedIn: (state) => state.isLoggedIn,
  is: (state) => (role) => (state.role ? state.role.name == role : false),
  isAt: (state) => (role, scope) =>
    state.role ? state.role.name == role && state.role.scope == scope : false,
  can: (state) => (permission) =>
    state.permissions.some((entry) => entry.name == permission),
  canAt: (state) => (permission, scope) =>
    state.permissions.some(
      (entry) => entry.name == permission && entry.scope == scope
    ),
}

const _mutations = {
  SET(state, payload) {
    state.isLoggedIn = true
    state.email = payload.email
    state.role = payload.role
    state.permissions = payload.permissions
    state.picture = payload.picture
    state.firstName = payload.firstName
    state.lastName = payload.lastName
  },

  DEL(state) {
    state.email = null
    state.isLoggedIn = false
    state.role = null
    state.permissions = []
    state.picture = null
    state.firstName = null
    state.lastName = null
  },
}

const _actions = {
  set(context, { sessionToken, redirect }) {
    let payload = parse(sessionToken)
    if (payload) {
      context.commit('SET', payload)
      window.sessionStorage.setItem('sessionToken', sessionToken)
      this.$api.userService.authorize(sessionToken)
    } else {
      context.commit('DEL')
      window.sessionStorage.removeItem('sessionToken')
      this.$api.userService.unauthorize()
    }
    if (redirect) this.$router.push(redirect).catch((err) => {})
  },

  async login(context, { authorizationCode, redirect }) {
    try {
      const loginResponse = await this.$api.userService.login({
        authorizationCode,
      })
      const sessionToken = loginResponse.data.sessionToken
      context.dispatch('set', { sessionToken, redirect })
    } catch (e) {
      context.dispatch('set', { sessionToken: null, redirect: '/' })
    }
  },

  logout(context) {
    context.dispatch('set', { sessionToken: null, redirect: '/' })
  },
}

export default (content) => ({
  namespaced,
  state: _state(content),
  getters: _getters,
  mutations: _mutations,
  actions: _actions,
})
