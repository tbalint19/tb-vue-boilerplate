var MockAdapter = require('axios-mock-adapter')

export const applyDomainAdapter = (axios) => {
  const adapter = new MockAdapter(axios, { delayResponse: 2500 })

  mockLogin( on(adapter), use(true) )
}

const mockLogin = (adapter, use) => {
  let call = adapter.onPost('/posts')
  if (!use) { call.passThrough() } else {
    call.reply(201, { username: "lajosFromMock" })
  }
}

const on = adapter => adapter
const use = bool => bool
