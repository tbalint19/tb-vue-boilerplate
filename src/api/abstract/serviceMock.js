var MockAdapter = require('axios-mock-adapter')

export default class ServiceMock {
  constructor(service) {
    this.service = new MockAdapter(service.http, { delayResponse: 2500 })
    console.warn(`Mock is active for ${service.constructor.name}`);
  }
}
