import { getError } from '../../util/validate'
const validations = require('../../../static/validations.json')

const namespaced = true

const state = () => { return {
    input: {
      username: "",
      password: ""
    },
    validation: {
      username: validations.username,
      password: validations.password
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
    return commit('INIT')
  },

  updateUsername({ commit }, value) {
    return commit('UPDATE_LOGIN_USERNAME', value)
  },

  blurUsername({ commit }) {
    return commit('BLUR_USERNAME')
  },

  updatePassword({ commit }, value) {
    return commit('UPDATE_LOGIN_PASSWORD', value)
  },

  blurPassword({ commit }) {
    return commit('BLUR_PASSWORD')
  },

  login (context) {
    context.commit('TOGGLE_LOADING', true)
    return this.$api.domain
      .login(context.state.input)
        .then(response =>
          handleLogin(this.$app, context, response))
        .catch(connectionError =>
          this.$app.$notify('error.login.connection'))
        .finally(() =>
          context.commit('TOGGLE_LOADING', false))
  },

  logout(context) {
    this.$app.$notify('note.logout')
    this.$app.$router.push("/login")
    return context.dispatch('user/set', null, { root: true })
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
    app.$notify('error.login.wrongCredentials')
}

const handleLoginSuccess = (app, context, response) => {
  context.dispatch('user/set', response.data, { root: true })
  app.$notify('success.login')
  app.$router.push('/')
}
