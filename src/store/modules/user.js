import { parse } from '@/util/jwt'
import API from '@/api'
import router from '@/router'

const namespaced = true

const state = () => ({
  email: null,
  isLoggedIn: false,
  role: null,
  permissions: [],
})

const mutations = {
  SET(state, payload) {
    state.isLoggedIn = true
    state.email = payload.email
    state.role = payload.role
    state.permissions = payload.permissions
  },

  DEL(state) {
    state.email = null
    state.isLoggedIn = false
    state.role = null
    state.permissions = []
  },
}

const getters = {
  email: (state) => state.email,
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

const actions = {
  set(context, { sessionToken, redirect }) {
    let payload = parse(sessionToken)
    if (payload) {
      context.commit('SET', payload)
      window.sessionStorage.setItem('sessionToken', sessionToken)
      API.userService.authorize(sessionToken)
      API.packageService.authorize(sessionToken)
    } else {
      context.commit('DEL')
      window.sessionStorage.removeItem('sessionToken')
      API.userService.unauthorize()
      API.packageService.unauthorize()
    }
    if (redirect) router.push(redirect).catch(err => {})
  },

  async login(context, { authorizationCode, redirect }) {
    try {
      const loginResponse = await API.userService.login({ authorizationCode })
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

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
}
