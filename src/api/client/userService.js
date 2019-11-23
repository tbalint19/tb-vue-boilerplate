import Service from '../abstract/service.js'

export default class UserService extends Service {
  constructor() {
    super('http://localhost:3000')
  }

  login({ authorizationCode }) {
    return this.http.post('/api/user/login', {
      authorizationCode,
    })
  }

}
