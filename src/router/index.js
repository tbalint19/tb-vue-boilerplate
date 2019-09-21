import Vue from 'vue'
import Router from 'vue-router'

const files = require.context('./routes', false, /\.js$/)
const routes = []

files.keys().forEach((key) => {
  if (key === './index.js') return
  routes.push(files(key).default)
})

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes,
})
