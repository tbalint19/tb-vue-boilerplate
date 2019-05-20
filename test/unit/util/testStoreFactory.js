import Vuex from 'vuex';

const initialLoginState = (require('../../../src/store/_login').default).state
const initialUserState = (require('../../../src/store/_user').default).state
const initialSearchState = (require('../../../src/store/_search').default).state

export const testStore = () => {
  const testStore = require('../../../src/store/').default

  testStore.state.login = Object.assign({}, initialLoginState)
  testStore.state.user = Object.assign({}, initialUserState)
  testStore.state.search = Object.assign({}, initialSearchState)

  return testStore
}
