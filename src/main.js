import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Notifications from 'vue-notification'
import BootstrapVue from "bootstrap-vue"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import router from './router'
import store from './store'
import api from './api'

// Plugins
Vue.use(BootstrapVue)
Vue.use(Notifications)
Vue.use(VueI18n)

// Components
Vue.component('navbar-top', require('@/components/common/navbar-top').default)
Vue.component('login-card', require('@/components/common//card/login-card').default)
Vue.component('landing-message', require('@/components/common/text/landing-message').default)
Vue.component('navbar-bottom', require('@/components/common/navbar-bottom').default)

Vue.component('grow-appear', require('@/components/transition/grow-appear').default)
Vue.component('fade-appear-swap', require('@/components/transition/fade-appear-swap').default)

Vue.component('v-icon', Icon)

// Language config
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: require('../static/dictionary/eng.json'),
    hu: require('../static/dictionary/hun.json')
  }
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
  template: '<App/>'
}).$mount('#app-container')

store.$app = app
store.$api = api

// import { uiMockTodo, applyMocks } from './api/mock/todo-mock'
// applyMocks(uiMockTodo(store))
