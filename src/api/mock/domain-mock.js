var MockAdapter = require('axios-mock-adapter')

const mockLogin = (adapter) => {
  adapter.onPost('/posts').reply(201, { username: "belaFromMock" })
}

const applyTo = (adapter) => {
  mockLogin(adapter)
  // ...
}

export const applyForUI = (domains) => {
  const domain = domains["domain"]
  const adapter = new MockAdapter(domain, { delayResponse: 3500 })

  applyTo(adapter)
}

export const applyForUnit = (domains) => {
  const domain = domains["domain"]
  const adapter = new MockAdapter(domain, { delayResponse: 0 })

  applyTo(adapter)
}
