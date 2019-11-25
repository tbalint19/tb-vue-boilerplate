import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import fs from 'fs'
import { defaultContent } from './defaultContent'
import apiMock from './apiMock'
import routerMock from './routerMock'

const localVue = createLocalVue()
localVue.use(Vuex)

export const testStore = (content = defaultContent()) => {

  const modules = {}

  const pathToModules = 'src/store/modules'
  fs.readdirSync(pathToModules)
    .forEach((file) => {
      const name = file.split(".")[0]
      modules[name] = (require("../../../" + pathToModules + "/" + file).default)(content)
    })

  const store = new Vuex.Store({ modules, strict: true })

  store.$api = apiMock
  store.$router = routerMock

  return store
}
