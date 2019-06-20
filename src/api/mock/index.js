import domains from '../domains'
import { applyDomainAdapter } from './domain-mock'

export default (() => {
  applyDomainAdapter(domains['domain'].http)
})()
