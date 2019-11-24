import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import fs from 'fs'

const modules = {}
const pathToModules = 'src/store/modules'
fs.readdirSync('src/store/modules')
  .forEach((file) => {
    const name = file.split(".")[0]
    modules[name] = require("../../../" + pathToModules + "/" + file)
  })

const localVue = createLocalVue()
localVue.use(Vuex)

export const testStore = () => new Vuex.Store({ modules, strict: true })
