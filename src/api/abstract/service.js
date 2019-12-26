import axios from 'axios'

export default class Service {
  constructor(baseURL) {
    this.http = axios.create({
      baseURL,
    })
  }

  authorize(sessionToken) {
    this.http.defaults.headers.common['Authorization'] = sessionToken
  }

  unauthorize() {
    delete this.http.defaults.headers.common['Authorization']
  }
}
