var MockAdapter = require('axios-mock-adapter')
var jwt = require('jsonwebtoken')

export const applyDomainAdapter = (axios) => {
  const adapter = new MockAdapter(axios, { delayResponse: 2500 })

  mockLogin(on(adapter), use(true))
}

const mockLogin = (adapter, use) => {
  let call = adapter.onPost('/posts')
  if (!use) {
    call.passThrough()
  } else {
    call.reply(request => ([200, { token: token(JSON.parse(request.data).title) }]))
  }
}

const on = (adapter) => adapter
const use = (bool) => bool
const token = (username) =>
  jwt.sign(
    {
      username: username,
      role: 'admin',
      permissions: ['doStuff', 'doOtherStuff'],
    },
    'secret-key'
  )
