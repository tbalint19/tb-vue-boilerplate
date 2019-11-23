const jwt = require('jsonwebtoken')
const { parse } = require('@/util/jwt')
const GOOGLE_CONFIG = require('@/../google.json')

export const loginResponse = async (request) => {
  const authorizationCode = JSON.parse(request.data).authorizationCode
  const { id, email } = await validateTokenWithGoogle(authorizationCode)
  const sessionToken = createSessionToken(id, email)
  if (sessionToken) return [200, { sessionToken }]
  else return [401, { sessionToken: null }]
}

const createSessionToken = (id, email) =>
  jwt.sign(
    {
      id,
      email,
      role: null,
      permissions: [],
    },
    'secret-key',
    { expiresIn: '8h' }
  )

const validateTokenWithGoogle = async (authorizationCode) => {
  console.log('Received auth code on backend:', authorizationCode)
  const response = await requestValidation(authorizationCode)
  const responseData = JSON.parse(response)
  const userData = parse(responseData.id_token)
  console.log('User data from token:', userData)
  return { id: userData.sub, email: userData.email }
}

const requestValidation = (idToken) =>
  new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const response = xhttp.responseText
        console.log('Response received from google', response)
        return resolve(response)
      }
    }
    const code = 'code=' + idToken
    const redirectUri = 'redirect_uri=' + GOOGLE_CONFIG.redirect_uri
    const clientId = 'client_id=' + GOOGLE_CONFIG.client_ID
    const clientSecret = 'client_secret=' + GOOGLE_CONFIG.client_secret
    const scope = 'scope=email+profile'
    const grantType = 'grant_type=authorization_code'
    const data =
      code +
      '&' +
      redirectUri +
      '&' +
      clientId +
      '&' +
      clientSecret +
      '&' +
      scope +
      '&' +
      grantType
    console.log('Data sent to google:', data)
    xhttp.open('POST', 'https://www.googleapis.com/oauth2/v4/token', true)
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhttp.send(data)
  })
