import store from '../../../src/store'
var sinon = require('sinon');

describe('Test should run', () => {
  it('Dummy test works', () => {
    
    store.commit('')
    expect(1)
      .to.equal(1)
  })
})
