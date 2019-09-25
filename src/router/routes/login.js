export default {
  path: '/login',
  name: 'login-page',
  component: require('@/components/login-page').default,
  beforeEnter: (to, from, next) => {
    if (!to.query.code) next('/auth')
    else next()
  },
}
