var MockAdapter = require('axios-mock-adapter')
import fs from 'fs'

const clients = {}
const mockServices = {}
const pathToClients = 'src/api/client'
fs.readdirSync(pathToClients)
  .forEach((file) => {
    const name = file.split(".")[0]
    clients[name] = new (require("../../../" + pathToClients + "/" + file).default)()
    mockServices[name] = new MockAdapter(clients[name].http, { delayResponse: 0 })
  })


export default { clients, mockServices }
