import Service from '../abstract/service.js'

export default class UserService extends Service {
  constructor() {
    super(process.env.VUE_APP_USER_SERVICE_URL)
  }

  login({ authorizationCode }) {
    return this.http.post('/api/user/login', {
      authorizationCode,
    })
  }

}
