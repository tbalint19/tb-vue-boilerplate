import Vue from 'vue'
import Router from 'vue-router'
const { attemptAuthenticate, attemptAuthorize } = require("./_guards.js").default

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login-page',
      component: require('@/components/login-page').default
    },
    {
      path: '/',
      name: 'home-page',
      component: require('@/components/home-page').default,
      beforeEnter: attemptAuthenticate
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
