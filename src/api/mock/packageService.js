var MockAdapter = require('axios-mock-adapter')

export const applyAdapter = (service) => {
  console.log('Package service mock is used!')
  const adapter = new MockAdapter(service.http, { delayResponse: 500 })

  mockPackages(on(adapter), use(true))
}

const mockPackages = (adapter, use) => {
  let call = adapter.onGet('/api/packages')
  if (!use) {
    call.passThrough()
  } else {
    call.reply(async (request) => {
      const packages = [ { name: "" }, { name: "" } ]
      return [200, { packages }]
    })
  }
}

const on = (adapter) => adapter
const use = (bool) => bool
