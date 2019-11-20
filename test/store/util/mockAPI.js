import API from '@/api'
const MockAdapter = require('axios-mock-adapter');

export const mockAPI = () => {
  let mockApi = {}
  const services = Object.keys(API)
  services.forEach((service) => {
    mockApi[service] = new MockAdapter(API[service].http, { delayResponse: 0 })
  })
  return mockApi
}

export const resetAPI = (mockApi) => {
  const services = Object.keys(mockApi)
  services.forEach((service) => {
    mockApi[service].reset()
  })
}
