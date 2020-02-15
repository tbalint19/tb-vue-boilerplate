const resolve = require('./resolve.js')
const localize = require('./localize.js')
const generate = require('./generate.js')
const cleanse = require('./cleanse.js')

const contentPath = __dirname + '/../content/src'
const outPath = __dirname + '/../content/out'

const content = resolve(contentPath)
const locales = localize(content)
const result = { content, locales }
cleanse(result)

generate(`${outPath}/content.json`, result)
