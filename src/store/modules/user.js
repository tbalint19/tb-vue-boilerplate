import { parse } from '@/util/jwt'

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
      this.$api.service.http.defaults.headers.common['Authorization'] = sessionToken;
    }
    else {
      window.localStorage.removeItem("sessionToken")
      delete this.$api.service.http.defaults.headers.common['Authorization']
    }
    if (redirect)
      this.$app.$router.push(redirect)
  },

  async login(context, idToken) {
    try {
      const loginResponse = await this.$api.service.login({ idToken })
      const sessionToken = loginResponse.data.sessionToken
      context.dispatch('set', { sessionToken, redirect: '/home' })
      this.$app.$notify('success.login')
    } catch (e) {
    } finally {
    }
  },

  logout(context) {
    this.$app.$notify('note.logout')
    this.$app.$router.push('/auth')
  },
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
}
