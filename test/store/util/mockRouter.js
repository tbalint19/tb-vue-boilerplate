import router from '@/router'

const stub = sinon.stub(router, 'push')

export const stubRouter = () => {
  const voidClosure = (...args) => {}

  stub.callsFake(voidClosure)
}

export const restoreRouter = () => {
  stub.restore()
}
