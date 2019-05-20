import store from '../store'

const loginUrl = "/login"

export default {

  attemptAuthenticate: (to, from, next) => {
    if (store.state.user.loggedIn)
      next()
    else
      next(loginUrl)
  },

  attemptAuthorize: (cred) => (to, from, next) => {
    authenticate(to, from, next)
    if (store.state.user.role == cred || store.state.user.permissions.includes(cred))
      next()
    else
      next(loginUrl)
  }

}
