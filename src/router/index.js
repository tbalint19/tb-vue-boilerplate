import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

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
