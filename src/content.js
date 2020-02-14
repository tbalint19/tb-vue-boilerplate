const content = require('../public/content.json')

const isLocalizeAble = (key) =>
  typeof key == 'string' && (key.includes('__en') || key.includes('__hu'))

const locales = {
  en: {},
  hu: {},
}

const localize = (content, path = [], root = content) => {
  if (Array.isArray(content))
    content.forEach((item, index) => localize(item, [...path, index], item))
  else if (typeof content === 'object' && content != null)
    Object.entries(content).forEach(([key, value]) =>
      localize(value, [...path, key], content)
    )
  else {
    const _key = path.slice(-1)[0]
    if (!isLocalizeAble(_key)) return
    const key = _key.split('__')[0]
    const locale = _key.split('__')[1]
    const localePath = [...path.slice(0, -1), key].join('.')
    root[key] = localePath
    locales[locale][localePath] = content
  }
}

localize(content)

console.log('locales', locales)

module.exports = { demo: content, locales }
