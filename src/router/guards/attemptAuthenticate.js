import store from '../../store'

export const attemptAuthenticate = (to, from, next) => {
  if (store.state.user.isLoggedIn) next()
  else next('/login')
}
