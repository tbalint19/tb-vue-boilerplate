const http = require('http')
const mockserver = require('mockserver')

let server

const start = (journey) => {
  console.log(`Mock server starts for ${journey}`);
  server = http.createServer(mockserver('./tests/e2e/mock-server/responses/' + journey)).listen(19791)
}

const shutdown = (journey) => {
  console.log(`Mock server is shutting down`);
  server.close()
}

module.exports = {
  start,
  shutdown
}
