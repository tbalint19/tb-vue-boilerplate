const files = require.context('./client', false, /\.js$/)

const clients = {}

files.keys().forEach((key) => {
  if (key === './index.js') return
  clients[key.replace(/(\.\/|\.js)/g, '')] = new (files(key).default)()
})

// require('./mock')

export default clients
