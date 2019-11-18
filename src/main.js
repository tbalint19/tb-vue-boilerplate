import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Notifications from 'vue-notification'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import router from './router'
import store from './store'
import services from './api'
import { AtomSpinner } from 'epic-spinners'
Vue.component('atom-spinner', AtomSpinner)

// 3rd party
Vue.use(BootstrapVue)
Vue.use(Notifications)
Vue.use(VueI18n)
Vue.component('v-icon', Icon)

// Components
const register = (Vue) => (path) => {
  const name = (path) => path.split('/')[path.split('/').length - 1]
  const component = (path) => require('@/components/' + path + '.vue').default
  Vue.component(name(path), component(path))
}

var components = [
  'common/navbar-top',
  'common/navbar-bottom',

  'common/text/landing-message',

  'common/notifications/custom-notification',

  'transition/grow-appear',
  'transition/grow-appear-elements',
  'transition/fade-appear-swap',
  'transition/slide-swap',
]
components.forEach(register(Vue))

// API interceptors
const {
  addLoggerInterceptor,
  addConnectionNotificationInterceptor,
} = require('./api/interceptor').default

// Language config
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: require('../static/dictionary/eng.json'),
    hu: require('../static/dictionary/hun.json'),
  },
  silentTranslationWarn: true,
})

// Dev config
Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'

// Init
import App from './App'
const app = new Vue({
  components: { App },
  router,
  store,
  i18n,
  template: '<App/>',
}).$mount('#app-container')

Object.values(services).forEach(addConnectionNotificationInterceptor(app))
Object.values(services).forEach(addLoggerInterceptor)
