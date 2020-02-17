import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'
import NavPlugin from './plugins/nav-plugin'
import IdlePlugin from 'lutzvue'

// Components
const register = (descriptor) => {
  const name = (path) => path.split('/')[path.split('/').length - 1]
  const component = (path) => require('@/components/' + path + '.vue').default
  Vue.component(name(descriptor), component(descriptor))
}

var components = [
  'x-navbar',
  'x-contact',
  'x-footer',

  'button/login-button',
  'button/logout-button',

  'transition/x-fade-appear-swap',
  'transition/x-grow-appear',
  'transition/x-slide-swap',
]
components.forEach(register)

Vue.use(NavPlugin)
Vue.use(IdlePlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
