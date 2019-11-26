import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import fs from 'fs'
import { defaultContent } from './content'
import api from './api'
import router from './router'

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

  store.$api = api.clients
  store.$router = router

  return store
}
