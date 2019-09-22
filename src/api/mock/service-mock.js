var MockAdapter = require('axios-mock-adapter')
var jwt = require('jsonwebtoken')
var { parse } = require('../../util/jwt')
var GOOGLE_CONFIG = require('../../../google.json')

export const applyServiceAdapter = (axios) => {
  console.log("Service mock is used!");
  const adapter = new MockAdapter(axios, { delayResponse: 500 })

  mockLogin(on(adapter), use(true))
}

const mockLogin = (adapter, use) => {
  let call = adapter.onPost('/api/login')
  if (!use) {
    call.passThrough()
  } else {
    call.reply(async (request) => {
      const authorizationCode = JSON.parse(request.data).authorizationCode
      const { id, username } = await validateTokenWithGoogle(authorizationCode)
      const sessionToken = createSessionToken(id, username)
      if (sessionToken)
        return [ 200, { sessionToken }]
      else
        return [ 401, { sessionToken: null }]
    })
  }
}

const on = (adapter) => adapter
const use = (bool) => bool
const createSessionToken = (id, username) =>
  jwt.sign(
    {
      id,
      username,
      role: null,
      permissions: [],
    },
    'secret-key',
    { expiresIn: '8h' }
  )
const validateTokenWithGoogle = async (authorizationCode) => {
  console.log("Received auth code on backend:", authorizationCode);
  const response = await requestValidation(authorizationCode)
  const responseData = JSON.parse(response)
  const userData = parse(responseData.id_token)
  console.log("User data from token:", userData);
  return { id: userData.sub, username: userData.email }
}

const requestValidation = (idToken) => new Promise((resolve, reject) => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const response = xhttp.responseText
        console.log("Response received from google", response)
        return resolve(response)
      }
  }
  const code = "code=" + idToken
  const redirectUri = "redirect_uri=" + GOOGLE_CONFIG.redirect_uri
  const clientId = "client_id=" + GOOGLE_CONFIG.client_ID
  const clientSecret = "client_secret=" + GOOGLE_CONFIG.client_secret
  const scope = "scope=email+profile"
  const grantType = "grant_type=authorization_code"
  const data = code + "&" + redirectUri + "&" + clientId + "&" + clientSecret + "&" + scope + "&" + grantType
  console.log("Data sent to google:", data);
  xhttp.open("POST", "https://www.googleapis.com/oauth2/v4/token", true);
  xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.send(data);
})
