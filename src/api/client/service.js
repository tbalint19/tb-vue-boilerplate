import axios from 'axios'

export default class Service {
  constructor() {
    this.http = axios.create({
      baseURL: 'http://localhost:3000',
    })
  }

  login({ authorizationCode }) {
    return this.http.post('/api/user/login', {
      authorizationCode,
    })
  }

  authorize(sessionToken) {
    this.http.defaults.headers.common['Authorization'] = sessionToken
  }

  unauthorize() {
    delete this.http.defaults.headers.common['Authorization']
  }
}
