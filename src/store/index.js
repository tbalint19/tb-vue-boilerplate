import Vue from 'vue'
import Vuex from 'vuex'

import API from '@/api'
import router from '@/router'
import content from '@/content'

const files = require.context('./modules', false, /\.js$/)
const modules = {}

files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default(content)
})

Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
})

store.$api = API
store.$router = router

export default store
