const files = require.context('.', false, /\.js$/)
const domains = {}

files.keys().forEach(key => {
  if (key === './index.js') return
  domains[key.replace(/(\.\/|\.js)/g, '')] = new (files(key).default)()
})

export default domains
