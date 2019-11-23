import Service from '@/api/abstract/service.js'

export default class PackageService extends Service {
  constructor() {
    super('http://localhost:4000')
  }

  getPackages() {
    return this.http.get('/api/packages')
  }

}
