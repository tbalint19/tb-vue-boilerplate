import services from '../client'
import { applyServiceAdapter } from './service-mock'

export default (() => {
  applyServiceAdapter(services['service'].http)
})()
