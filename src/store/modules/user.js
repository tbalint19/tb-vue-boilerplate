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
  username: (state) => state.email ? state.email.split("@")[0] : "",
  isLoggedIn: (state) => state.isLoggedIn,
  is: (state) => (role) => state.role == role,
  can: (state) => (permission) => state.permissions.includes(permission),
}

const actions = {
  set(context, { sessionToken, redirect }) {
    let payload = parse(sessionToken)
    if (payload) {
      context.commit('SET', payload)
      window.sessionStorage.setItem("sessionToken", sessionToken)
      API.service.authorize(sessionToken)
    }
    else {
      context.commit('DEL')
      window.sessionStorage.removeItem("sessionToken")
      API.service.unauthorize()
    }
    if (redirect)
      router.push(redirect)
  },

  async login(context, authorizationCode) {
    try {
      const loginResponse = await API.service.login({ authorizationCode })
      const sessionToken = loginResponse.data.sessionToken
      context.dispatch('set', { sessionToken, redirect: '/home' })
      this._vm.$notify('success.login')
    } catch (e) {
      context.dispatch('set', { sessionToken: null, redirect: '/auth' })
      this._vm.$notify('error.login')
    } finally {
    }
  },

  logout(context) {
    context.dispatch('set', { sessionToken: null, redirect: '/auth' })
    this._vm.$notify('note.logout')
  },
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
}
