const files = require.context('.', false, /\.js$/)

let interceptors = {}

files.keys().forEach((key) => {
  if (key === './index.js') return
  interceptors[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default interceptors
