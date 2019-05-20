import API from '../api'
import Vue from 'vue'
import router from '../router'
import { reportLoginSuccess } from '../util/notify'

export default {

  state: {
    username: "",
    password: "",
    isLoading: false
  },

  mutations: {
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
  },

  getters: {
    isLoading: state => state.isLoading,
    isActive: (state, getters) => !state.isLoading && getters.usernameIsValid && getters.passwordIsValid,
    usernameIsValid: state => state.username.length > 5,
    passwordIsValid: state => state.password.length > 5
  },

  actions: {
    REQUEST_LOGIN (context) {
      context.commit('TOGGLE_LOADING', true)
      API.todo.addTodo({ title: "a", text: "a" })
        .then(response => {
          if (response.status == 201) {
            context.commit('RESET_LOGIN_CREDENTIALS')
            context.commit('user/SET_USER', {}, { root: true })
            reportLoginSuccess()
            router.push('/')
          } else {
            reportLoginSuccess()
          }
        })
        .catch(err => reportLoginSuccess())
        .finally(() => context.commit('TOGGLE_LOADING', false))
    }
  }
}
