const http = require('http')
const axios = require('axios')
var MockAdapter = require('axios-mock-adapter')
const mockServer = new MockAdapter(axios)
let instance

const startMockServer = (journey) => {
  console.log(`Mock server starts for ${journey}`)
  instance = http.createServer(async (request, response) => {

	if (request.method === 'OPTIONS') {
    response.setHeader('Access-Control-Allow-Origin', '*')
  	response.setHeader('Access-Control-Request-Method', '*')
  	response.setHeader('Access-Control-Allow-Methods', '*')
  	response.setHeader('Access-Control-Allow-Headers', request.headers.origin)
		response.writeHead(200)
		return response.end()
	}

    const mockResponse = await axios({
      method: request.method,
      url: request.url
    })

    if (mockResponse.headers)
      Object.entries(mockResponse.headers).forEach(([key, value]) => response.setHeader(key, value))
    response.setHeader('Access-Control-Allow-Origin', '*')
  	response.setHeader('Access-Control-Request-Method', '*')
  	response.setHeader('Access-Control-Allow-Methods', '*')
  	response.setHeader('Access-Control-Allow-Headers', request.headers.origin)
    response.status = mockResponse.status

    if (mockResponse.data)
      response.write(JSON.stringify(mockResponse.data))

    response.end()

  }).listen(19791)
}

const shutdownMockServer = (journey) => {
  console.log(`Mock server is shutting down`)
  instance.close()
}

const response = ({ status, body, headers=null, delay }) => (config) => {
  return new Promise(function(resolve, reject) {
    setTimeout(() => resolve(headers ? [status, body, headers] : [status, body]), delay)
  })
}

module.exports = {
  startMockServer,
  shutdownMockServer,
  mockServer,
  response
}
