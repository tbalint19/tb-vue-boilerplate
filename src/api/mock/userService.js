import ServiceMock from '@/api/abstract/serviceMock.js'
import { loginResponse } from '@/api/response/userService.js'

export default class PackageServiceMock extends ServiceMock {
  constructor(service) {
    super(service)

    this.service.onPost('/api/user/login').reply(loginResponse)
  }
}
