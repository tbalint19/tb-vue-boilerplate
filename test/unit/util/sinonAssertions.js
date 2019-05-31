export const expectRedirect = (store, url) => {
  sinon.assert.calledOnce(store.$app.$router.push);
  sinon.assert.calledWith(store.$app.$router.push, url);
}

export const expectNoRedirection = store => {
  sinon.assert.notCalled(store.$app.$router.push);
}

export const expectNotification = store => {
  sinon.assert.calledOnce(store.$app.$notify);
}

export const to = url => url
export const by = store => store
