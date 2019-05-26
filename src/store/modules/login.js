import { reportLoginSuccess, reportLoginClientError, reportLoginServerError } from '../../util/notify'

const namespaced = true

const state = {
  username: "",
  password: "",
  isLoading: false
}

const mutations = {
  UPDATE_LOGIN_USERNAME (state, username) {
    state.username = username
  },

  UPDATE_LOGIN_PASSWORD (state, password) {
    state.password = password
  },

  RESET_LOGIN_CREDENTIALS (state) {
    state.username = ""
    state.password = ""
  },

  TOGGLE_LOADING (state, to) {
    state.isLoading = to
  }
}

const getters = {
  username: state => state.username,
  password: state => state.password,
  isLoading: state => state.isLoading,
  isActive: (state, getters) => !state.isLoading && getters.usernameIsValid && getters.passwordIsValid,
  usernameIsValid: state => state.username.length > 5,
  passwordIsValid: state => state.password.length > 5
}

const actions = {
  updateUsername(context, value) {
    context.commit('UPDATE_LOGIN_USERNAME', value)
  },

  updatePassword(context, value) {
    context.commit('UPDATE_LOGIN_PASSWORD', value)
  },

  login (context, todo={ title: "a", text: "a" }) {
    context.commit('TOGGLE_LOADING', true)
    this.$api.todo.addTodo(todo)
      .then(response =>
        handleLogin(this.$app, context, response))
      .catch(err =>
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
