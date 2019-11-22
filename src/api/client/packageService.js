import axios from 'axios'

export default class PackageService {
  constructor() {
    this.http = axios.create({
      baseURL: 'http://localhost:4000',
    })
  }

  getPackages() {
    return this.http.get('/api/packages')
  }

  authorize(sessionToken) {
    this.http.defaults.headers.common['Authorization'] = sessionToken
  }

  unauthorize() {
    delete this.http.defaults.headers.common['Authorization']
  }
}
