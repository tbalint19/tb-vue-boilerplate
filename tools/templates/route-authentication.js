import { attemptAuthenticate } from '../guards/attemptAuthenticate'

export default {
  path: '/__pageName__',
  name: '__pageName__-page',
  component: require('@/components/__pageName__-page').default,
  beforeEnter: attemptAuthenticate,
}
