import Vue from 'vue'

import router from './router'
import store from './store'

import Notifications from 'vue-notification'
import BootstrapVue from "bootstrap-vue"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'



// Config
import englishDictionary from '../static/dictionary/eng.json'
import hungarianDictionary from '../static/dictionary/hu.json'
let languageConfig = {
  "eng": englishDictionary,
  "hu": hungarianDictionary
}

// Vue.http = Vue.prototype.$http = axios



// Plugins
Vue.use(BootstrapVue)
Vue.use(Notifications)


// Components
Vue.component('navbar-component', require('@/components/common/navbar-component').default)
Vue.component('v-icon', Icon)



// Init
Vue.config.productionTip = false

import Root from './Root'
new Vue({
  components: { Root },
  router,
  store,
  template: '<Root/>'
}).$mount('#root-container')
