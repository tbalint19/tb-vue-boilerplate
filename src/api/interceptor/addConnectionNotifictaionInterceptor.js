export default (app) => (client) => {
  client.http.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (!error.response) app.$notify('error.connection.default')
      return Promise.reject(error)
    }
  )
}
