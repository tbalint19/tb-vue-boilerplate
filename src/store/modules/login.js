import { reportLoginSuccess, reportLoginClientError, reportLoginServerError } from '../../util/notify'
import { getError } from '../../util/validate'
const validations = require('../../../static/validations.json')

const namespaced = true

const state = () => { return {
    user: {
      username: "",
      password: ""
    },
    validations: {
      username: validations.username,
      password: validations.password
    },
    usernameWasEdited: false,
    passwordWasEdited: false,
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

  BLUR_USERNAME (state) {
    state.usernameWasEdited = true
  },

  BLUR_PASSWORD (state) {
    state.passwordWasEdited = true
  },

  RESET_LOGIN_STATE (state) {
    state.user.username = ""
    state.user.password = ""
    state.usernameWasEdited = false
    state.passwordWasEdited = false
  },

  TOGGLE_LOADING (state, to) {
    state.isLoading = to
  }
}

const getters = {
  username: state => state.user.username,
  password: state => state.user.password,
  usernameErrorKey: state => getError(state.user.username, state.validations.username),
  passwordErrorKey: state => getError(state.user.password, state.validations.password),
  hasUsernameError: (state, getters) => getters.usernameErrorKey != null,
  hasPasswordError: (state, getters) => getters.passwordErrorKey != null,
  userNameErrorShown: (state, getters) => state.usernameWasEdited && getters.hasUsernameError,
  passwordErrorShown: (state, getters) => state.passwordWasEdited && getters.hasPasswordError,
  hasInputError: (state, getters) => getters.hasUsernameError || getters.hasPasswordError,
  isLoading: state => state.isLoading,
  isDisabled: (state, getters) => getters.isLoading || getters.hasInputError
}

const actions = {
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
  context.commit('RESET_LOGIN_STATE')
  context.commit('user/SET_USER', response.data, { root: true })
  reportLoginSuccess(app)
  app.$router.push('/')
}
