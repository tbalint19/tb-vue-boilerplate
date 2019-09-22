import store from '../../store'

export const attemptAuthenticate = (to, from, next) => {
  if (store.state.user.isLoggedIn)
    next()
  else {
    const sessionToken = window.sessionStorage.getItem("sessionToken")
    if (sessionToken) {
      store.dispatch('user/set', { sessionToken }, { root: true })
      next()
    }
    else next('/auth')
  }
}
