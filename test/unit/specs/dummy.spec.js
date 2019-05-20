import login from '../../../src/store/_login'
var sinon = require('sinon');
import Vuex from 'vuex';

describe('Test should run', () => {

  let state
  let mutations
  let store

  beforeEach(() => {
    mutations = login.mutations
    state = {
      username: ""
    }
    store = new Vuex.Store({state, mutations})

    sinon.stub(console, 'log')
    console.log.callsFake((...args) => {
      console.info("STUBBED!!!", args)
    });
  })

  it('Dummy test works', () => {
    // given
    /* nothing happens */

    // when
    store.commit("UPDATE_LOGIN_USERNAME", "bela")

    // then
    sinon.assert.calledOnce(console.log);
    sinon.assert.calledWith(console.log, "called", "bela");

    expect(state.username).to.equal("bela")
  })
})
