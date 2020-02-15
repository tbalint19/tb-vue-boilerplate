const toDelete = (key) =>
  (typeof key == 'string' && (key.includes('__en') || key.includes('__hu'))) ||
  key == '_rank'

const cleanse = (content, path = [], root = content) => {
  const _key = path.slice(-1)[0]
  if (toDelete(_key)) delete root[_key]
  if (Array.isArray(content))
    content.forEach((item, index) => cleanse(item, [...path, index], item))
  else if (typeof content === 'object' && content != null)
    Object.entries(content).forEach(([key, value]) =>
      cleanse(value, [...path, key], content)
    )
  else {
    const _key = path.slice(-1)[0]
    if (!toDelete(_key)) return
    delete root[_key]
  }
  return content
}

module.exports = cleanse
