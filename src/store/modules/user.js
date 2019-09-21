import { parse } from '@/util/jwt'
import API from '@/api'
import router from '@/router'

const namespaced = true

const state = () => ({
  username: null,
  isLoggedIn: false,
  role: null,
  permissions: [],
})

const mutations = {
  SET(state, user) {
    state.isLoggedIn = true
    state.username = user.username
    state.role = user.role
    state.permissions = user.permissions
  },

  DEL(state) {
    state.username = null
    state.isLoggedIn = false
    state.role = null
    state.permissions = []
  },
}

const getters = {
  username: (state) => state.username,
  isLoggedIn: (state) => state.isLoggedIn,
  is: (state) => (role) => state.role == role,
  can: (state) => (permission) => state.permissions.includes(permission),
}

const actions = {
  set(context, { sessionToken, redirect }) {
    let user = parse(sessionToken)
    if (user)
      context.commit('SET', user)
    else
      context.commit('DEL')
    if (user) {
      window.localStorage.setItem("sessionToken", sessionToken)
      API.service.http.defaults.headers.common['Authorization'] = sessionToken;
    }
    else {
      window.localStorage.removeItem("sessionToken")
      delete API.service.http.defaults.headers.common['Authorization']
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
    } finally {
    }
  },

  logout(context) {
    this._vm.$notify('note.logout')
    router.push('/auth')
  },
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
}
