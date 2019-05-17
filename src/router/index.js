import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const loginUrl = "/login"

const attemptAuthenticate = (to, from, next) => {
  if (store.state.user.loggedIn) next()
  else next(loginUrl)
}

const attemptAuthorize = (cred) => (to, from, next) => {
  authenticate(to, from, next)
  if (store.state.user.role == cred || store.state.user.permissions.includes(cred)) next()
  else next(loginUrl)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/landing-page').default
    },
    {
      path: '/other',
      name: 'other-page',
      component: require('@/components/other-page').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
