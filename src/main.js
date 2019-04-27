import Vue from 'vue'
import VueI18n from 'vue-i18n'

import router from './router'
import store from './store'

import Notifications from 'vue-notification'
import BootstrapVue from "bootstrap-vue"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'


// Plugins
Vue.use(BootstrapVue)
Vue.use(Notifications)
Vue.use(VueI18n)


// Components
Vue.component('navbar-component', require('@/components/common/navbar-component').default)
Vue.component('v-icon', Icon)



// Config
import englishDictionary from '../static/dictionary/eng.json'
import hungarianDictionary from '../static/dictionary/hu.json'
let messages = {
  en: englishDictionary,
  hu: hungarianDictionary
}
const i18n = new VueI18n({
  locale: 'en',
  messages
})

Vue.prototype.$todoApi = require("./api/todo.js").default



// Init
Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'

import App from './App'
new Vue({
  components: { App },
  router,
  store,
  i18n,
  template: '<App/>'
}).$mount('#app-container')
