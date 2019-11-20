var MockAdapter = require('axios-mock-adapter')
import modules from '@/store/modules'

import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)

export const testStore = () => new Vuex.Store({ modules, strict: true })
