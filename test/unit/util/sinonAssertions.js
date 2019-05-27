var sinon = require('sinon');

export const expectRedirect = (store, url) => {
  sinon.assert.calledOnce(store.$app.$router.push);
  sinon.assert.calledWith(store.$app.$router.push, url);
}

export const to = url => url
export const by = store => store

export const expectNotification = store => {
  sinon.assert.calledOnce(store.$app.$notify);
  sinon.assert.callCount(store.$app.$t, 2);
}
