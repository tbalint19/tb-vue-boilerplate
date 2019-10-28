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

  upload(formData) {
    return this.http.post('/api/file/upload', formData , {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
    })
  }

  authorize(sessionToken) {
    this.http.defaults.headers.common['Authorization'] = sessionToken
  }

  unauthorize() {
    delete this.http.defaults.headers.common['Authorization']
  }
}
