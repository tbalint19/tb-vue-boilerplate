import domains from '../client'
import { applyServiceAdapter } from './service-mock'

export default (() => {
  applyServiceAdapter(domains['service'].http)
})()
