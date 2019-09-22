import axios from 'axios'

export default class Service {
  constructor() {
    this.http = axios.create({
      baseURL: 'https://service.com',
    })
  }

  login({ authorizationCode }) {
    return this.http.post('/api/login', {
      authorizationCode,
    })
  }

  renewSession() {
    return this.http.get('/api/login')
  }

  authorize(sessionToken) {
    this.http.defaults.headers.common['Authorization'] = sessionToken;
  }

  unauthorize() {
    delete this.http.defaults.headers.common['Authorization']
  }
}
