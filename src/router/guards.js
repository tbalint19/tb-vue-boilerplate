import store from '../store'

export default (() => {

  const loginUrl = "/login"

  const attemptAuthenticate = (to, from, next) => {
    if (store.state.user.loggedIn)
      next()
    else
      next(loginUrl)
  }

  const attemptAuthorize = (cred) => (to, from, next) => {
    authenticate(to, from, next)
    if (store.state.user.role == cred || store.state.user.permissions.includes(cred))
      next()
    else
      next(loginUrl)
  }

  return {
    attemptAuthenticate,
    attemptAuthorize
  }
})()
