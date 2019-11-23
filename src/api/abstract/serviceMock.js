var MockAdapter = require('axios-mock-adapter')

export default class ServiceMock {
  constructor(service) {
    this.service = new MockAdapter(service.http, { delayResponse: 500 })
    console.log(`Mock is active for ${service.constructor.name}`);
  }
}
