import { reportLoginSuccess, reportLoginClientError, reportLoginServerError, reportLogout } from '../../util/notify'
import { getError } from '../../util/validate'
const validation = require('../../../static/validations.json')

const namespaced = true

const state = () => { return {
    input: {
      username: "",
      password: ""
    },
    validation: {
      username: validation.username,
      password: validation.password
    },
    usernameWasEdited: false,
    passwordWasEdited: false,
    isLoading: false
  }
}

const mutations = {
  INIT (state) {
    state.input.username = ""
    state.input.password = ""
    state.usernameWasEdited = false
    state.passwordWasEdited = false
    state.isLoading = false
  },

  UPDATE_LOGIN_USERNAME (state, username) {
    state.input.username = username
  },

  UPDATE_LOGIN_PASSWORD (state, password) {
    state.input.password = password
  },

  BLUR_USERNAME (state) {
    state.usernameWasEdited = true
  },

  BLUR_PASSWORD (state) {
    state.passwordWasEdited = true
  },

  TOGGLE_LOADING (state, to) {
    state.isLoading = to
  }
}

const getters = {
  username: state => state.input.username,
  password: state => state.input.password,
  usernameErrorKey: state => getError(state.input.username, state.validation.username),
  passwordErrorKey: state => getError(state.input.password, state.validation.password),
  hasUsernameError: (state, getters) => getters.usernameErrorKey != null,
  hasPasswordError: (state, getters) => getters.passwordErrorKey != null,
  userNameErrorShown: (state, getters) => state.usernameWasEdited && getters.hasUsernameError,
  passwordErrorShown: (state, getters) => state.passwordWasEdited && getters.hasPasswordError,
  hasInputError: (state, getters) => getters.hasUsernameError || getters.hasPasswordError,
  isLoading: state => state.isLoading,
  isDisabled: (state, getters) => getters.isLoading || getters.hasInputError
}

const actions = {
  init({ commit }) {
    commit('INIT')
  },

  updateUsername({ commit }, value) {
    commit('UPDATE_LOGIN_USERNAME', value)
  },

  blurUsername({ commit }) {
    commit('BLUR_USERNAME')
  },

  updatePassword({ commit }, value) {
    commit('UPDATE_LOGIN_PASSWORD', value)
  },

  blurPassword({ commit }) {
    commit('BLUR_PASSWORD')
  },

  login (context) {
    context.commit('TOGGLE_LOADING', true)
    return this.$api.domain.login(context.state.input)
      .then(response =>
        handleLogin(this.$app, context, response))
      .catch(connectionError =>
        reportLoginServerError(this.$app))
      .finally(() =>
        context.commit('TOGGLE_LOADING', false))
  },

  logout(context) {
    context.dispatch('user/set', null, { root: true })
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

const handleLogin = (app, context, response) => {
  if (response.status == 201)
    handleLoginSuccess(app, context, response)
  else
    reportLoginClientError(app)
}

const handleLoginSuccess = (app, context, response) => {
  context.dispatch('user/set', response.data, { root: true })
  reportLoginSuccess(app)
  app.$router.push('/')
}
