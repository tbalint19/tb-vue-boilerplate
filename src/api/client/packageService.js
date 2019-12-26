import Service from '@/api/abstract/service.js'

export default class PackageService extends Service {
  constructor() {
    super(process.env.VUE_APP_PACKAGE_SERVICE_URL)
  }

  getPackages() {
    return this.http.get('/api/packages')
  }
}
