const clientFiles = require.context('./client', false, /\.js$/)
const API = {}
clientFiles.keys().forEach((key) => {
  const serviceName = key.replace(/(\.\/|\.js)/g, '')
  API[serviceName] = new (clientFiles(key).default)()
})

if (process.env.NODE_ENV == 'development') {  
  const mockFiles = require.context('./mock', false, /\.js$/)
  mockFiles.keys().forEach((key) => {
    const serviceName = key.replace(/(\.\/|\.js)/g, '')
    new (mockFiles(key).default)(API[serviceName])
  })
}


Object.values(API).forEach((client) => {
  if (!(process.env.NODE_ENV == 'development')) return
  client.http.interceptors.response.use(
    (response) => {
      console.log(response)
      return response
    },
    (error) => {
      console.log(error)
      if (error.response) console.log(error.response)
      return Promise.reject(error)
    }
  )
})


export default API
