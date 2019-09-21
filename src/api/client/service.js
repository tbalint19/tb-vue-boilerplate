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
}
