import store from '../../store'

export const attemptAuthenticate = (to, from, next) => {
  if (store.state.user.loggedIn)
    next()
  else
    next("/login")
}
