import Vuex from 'vuex';
var MockAdapter = require('axios-mock-adapter')
import domains from '../../../src/api'
var sinon = require('sinon');

const initialState = Object.assign({}, (require('../../../src/store').default).state)

const voidClosure = (...args) => {}

const stubApp = store => {
  store.$app = {
    $router: {
      push: function() {}
    },
    $t: function() {},
    $notify: function() {}
  }

  sinon.stub(store.$app.$router, 'push')
  store.$app.$router.push.callsFake(voidClosure)

  sinon.stub(store.$app, '$t')
  store.$app.$t.callsFake(voidClosure)

  sinon.stub(store.$app, '$notify')
  store.$app.$notify.callsFake(voidClosure)
}

const addAdapters = (store) => {
  store.adapters = {}
  const domains = Object.keys(store.$api)
  domains.forEach(domain => {
    store.adapters[domain] =  new MockAdapter(store.$api[domain].http, { delayResponse: 0 })
  })
}

export const testStore = () => {
  const testStore = require('../../../src/store/').default
  testStore.replaceState(Object.assign({}, initialState))

  stubApp(testStore)

  testStore.$api = domains
  addAdapters(testStore)

  return testStore
}
