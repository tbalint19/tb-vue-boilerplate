export default (client) => {
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
}
