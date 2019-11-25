import fs from 'fs'

const clients = {}
const pathToClients = 'src/api/client'
fs.readdirSync(pathToClients)
  .forEach((file) => {
    const name = file.split(".")[0]
    clients[name] = new (require("../../../" + pathToClients + "/" + file).default)()
  })

export default clients
