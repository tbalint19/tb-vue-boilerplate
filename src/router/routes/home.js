import { attemptAuthenticate } from '../guards/attemptAuthenticate'

export default {
  path: '/',
  name: 'home-page',
  component: require('@/components/home-page').default,
  beforeEnter: attemptAuthenticate
}
