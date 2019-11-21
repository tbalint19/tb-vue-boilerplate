import router from '@/router'

let stub

export const stubRouter = () => {
  const voidClosure = (...args) => {}
  stub = sinon.stub(router, 'push')
  stub.callsFake(voidClosure)
}

export const restoreRouter = () => {
  stub.restore()
}

export const expectRedirect = (to) => {
  sinon.assert.calledOnce(stub)
  sinon.assert.calledWith(stub, to)
}

export const expectDidNotRoute = () => {
  sinon.assert.notCalled(stub)
}
