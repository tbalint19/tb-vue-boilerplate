import domains from '../client'
import { applyDomainAdapter } from './domain-mock'

export default (() => {
  applyDomainAdapter(domains['domain'].http)
})()
