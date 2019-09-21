import store from '../../store'

export const attemptAuthenticate = (to, from, next) => {
  if (store.state.user.isLoggedIn)
    next()
  else {
    const sessionToken = window.localStorage.getItem("sessionToken")
    if (sessionToken) {
      store.dispatch('user/set', { sessionToken }, { root: true })
    }
    else next('/auth')
  }
}
