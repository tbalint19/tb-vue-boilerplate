var MockAdapter = require("axios-mock-adapter")
var jwt = require("jsonwebtoken")

export const applyDomainAdapter = axios => {
  const adapter = new MockAdapter(axios, { delayResponse: 2500 })

  mockLogin(on(adapter), use(true))
}

const mockLogin = (adapter, use) => {
  let call = adapter.onPost("/posts")
  let token = jwt.sign(
    {
      username: "bela",
      role: "admin",
      permissions: ["doStuff", "doOtherStuff"],
    },
    "secret-key"
  )
  if (!use) {
    call.passThrough()
  } else {
    call.reply(200, { token })
  }
}

const on = adapter => adapter
const use = bool => bool
