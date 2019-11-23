import ServiceMock from '@/api/abstract/serviceMock.js'
import {
  getPackagesResponse
} from '@/api/response/packageService.js'

export default class PackageServiceMock extends ServiceMock {
  constructor(service) {
    super(service)

    this.service.onGet('/api/packages').reply(getPackagesResponse)
  }
}
