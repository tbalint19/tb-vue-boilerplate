import Vuex from 'vuex';

const initialLoginState = (require('../../../src/store/_login').default).state
const initialUserState = (require('../../../src/store/_user').default).state
const initialSearchState = (require('../../../src/store/_search').default).state

const stubApp = store => {
  store.$app = { $router: { push: function() {} }, $t: function() {}, $notify: function() {} }
  sinon.stub(store.$app.$router, 'push')
  sinon.stub(store.$app, '$t')
  sinon.stub(store.$app, '$notify')
}

export const testStore = () => {
  const testStore = require('../../../src/store/').default

  testStore.state.login = Object.assign({}, initialLoginState)
  testStore.state.user = Object.assign({}, initialUserState)
  testStore.state.search = Object.assign({}, initialSearchState)

  stubApp(testStore)

  return testStore
}
