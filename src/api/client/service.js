import axios from 'axios'

export default class Service {
  constructor() {
    this.http = axios.create({
      baseURL: 'https://service.com',
    })
  }

  login({ idToken }) {
    return this.http.post('/api/login', {
      idToken,
    })
  }
}
