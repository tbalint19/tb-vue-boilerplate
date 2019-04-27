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

// Plugins
Vue.use(BootstrapVue)
Vue.use(Notifications)
Vue.use(VueI18n)

// Components
Vue.component('navbar-component', require('@/components/common/navbar-component').default)
Vue.component('v-icon', Icon)

// Language config
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: require('../static/dictionary/eng.json'),
    hu: require('../static/dictionary/hu.json')
  }
})

// Api config
Vue.prototype.$todoApi = require("./api/todo.js").default

// Dev config
Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'

// Init
import App from './App'
new Vue({
  components: { App },
  router,
  store,
  i18n,
  template: '<App/>'
}).$mount('#app-container')
