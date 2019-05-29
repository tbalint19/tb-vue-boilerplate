import { reportLoginSuccess, reportLoginClientError, reportLoginServerError } from '../../util/notify'

const namespaced = true

const state = () => { return {
    user: {
      username: "",
      password: ""
    },
    isLoading: false
  }
}

const mutations = {
  UPDATE_LOGIN_USERNAME (state, username) {
    state.user.username = username
  },

  UPDATE_LOGIN_PASSWORD (state, password) {
    state.user.password = password
  },

  RESET_LOGIN_CREDENTIALS (state) {
    state.user.username = ""
    state.user.password = ""
  },

  TOGGLE_LOADING (state, to) {
    state.isLoading = to
  }
}

const getters = {
  username: state => state.user.username,
  password: state => state.user.password,
  isLoading: state => state.isLoading,
  isActive: (state, getters) => !state.isLoading && getters.usernameIsValid && getters.passwordIsValid,
  usernameIsValid: state => state.user.username.length > 5,
  passwordIsValid: state => state.user.password.length > 5
}

const actions = {
  updateUsername(context, value) {
    context.commit('UPDATE_LOGIN_USERNAME', value)
  },

  updatePassword(context, value) {
    context.commit('UPDATE_LOGIN_PASSWORD', value)
  },

  login (context) {
    context.commit('TOGGLE_LOADING', true)
    return this.$api.domain.login(context.state.user)
      .then(response =>
        handleLogin(this.$app, context, response))
      .catch(connectionError =>
        reportLoginServerError(this.$app))
      .finally(() =>
        context.commit('TOGGLE_LOADING', false))
  }
}

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}

const handleLogin = (app, context, response) => {
  if (response.status == 201)
    handleLoginSuccess(app, context, response)
  else
    reportLoginClientError(app)
}

const handleLoginSuccess = (app, context, response) => {
  context.commit('RESET_LOGIN_CREDENTIALS')
  context.commit('user/SET_USER', response.data, { root: true })
  reportLoginSuccess(app)
  app.$router.push('/')
}
