import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    search: { namespaced: true, ...require('./_search.js').default },
    user: { namespaced: true, ...require('./_user.js').default },
    login: { namespaced: true, ...require('./_login.js').default },
    landing: { namespaced: true, ...require('./_landing.js').default }
  }
})

export default store
