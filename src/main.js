import Vue from 'vue'


// Bootstrap
import BootstrapVue from "bootstrap-vue"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


// Fontawesome
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import fas from '@fortawesome/fontawesome-free-solid'
fontawesome.library.add(fas)


// tbalint19 plugins
import LanguagePlugin from 'tb-vue-i18n'                      // https://www.npmjs.com/package/tb-vue-i18n
import NotificationPlugin from 'tb-vue-notifications'         // https://www.npmjs.com/package/tb-vue-notifications
import HashRouterPlugin from 'tb-vue-hash-router'             // https://www.npmjs.com/package/tb-vue-hash-router
import AuthPlugin from 'tb-vue-auth'                          // https://www.npmjs.com/package/tb-vue-auth
import HttpPlugin from 'tb-vue-http'                          // https://www.npmjs.com/package/tb-vue-http


// Components
import LoginPage from './components/login-page'
import LandingPage from './components/landing-page'
import DashboardPage from './components/dashboard-page'


// Language config
import englishDictionary from '../static/dictionary/eng.json'
import hungarianDictionary from '../static/dictionary/hu.json'
let languageConfig = {
  "eng": englishDictionary,
  "hu": hungarianDictionary
}


// Api config
let apiConfig = [
  { name: "api1", url: "http://localhost:5000", headers: { "Authorization": () => localStorage.getItem('my-auth-token') } },
  { name: "api2", url: "http://localhost:6000", headers: { "api-key": "1x2y3zasd456fgh789" } }
]


// Init
Vue.use(BootstrapVue)
Vue.component(FontAwesomeIcon.name, FontAwesomeIcon)

Vue.use(NotificationPlugin)
Vue.use(LanguagePlugin, languageConfig)
Vue.use(HttpPlugin, apiConfig)
Vue.use(HashRouterPlugin, { landingPage: 'landing-page' })
Vue.use(AuthPlugin)

Vue.component('login-page', LoginPage)
Vue.component('landing-page', LandingPage)
Vue.component('dashboard-page', DashboardPage)

import Root from './Root'
new Vue({
  el: '#root',
  template: '<Root/>',
  components: { Root }
})
