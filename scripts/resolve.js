const fs = require('fs')

const resolve = (contentPath) => {
  const root = require(`${contentPath}/_root.json`)

  const resolveWithPath = (path = [], container = root) => {
    const fullPath = `${contentPath}/${path.join('/')}`
    const entities = fs.readdirSync(fullPath, { withFileTypes: true })
    for (let entity of entities) {
      if (entity.name === '_root.json') continue
      if (entity.isDirectory()) {
        const directoryName = entity.name
        if (!Array.isArray(container)) {
          if (!container[directoryName])
            container[
              directoryName
            ] = require(`${fullPath}/${directoryName}/_root.json`)
          resolveWithPath([...path, directoryName], container[directoryName])
        } else {
          container.push(require(`${fullPath}/${directoryName}/_root.json`))
          resolveWithPath(
            [...path, directoryName],
            container[container.length - 1]
          )
          container.sort((one, other) => one._rank - other._rank)
        }
      } else {
        const fileName = entity.name.slice(0, -5)
        const content = require(`${fullPath}/${fileName}`)
        if (Array.isArray(container)) {
          container.push(content)
          if (content._rank)
            container.sort((one, other) => one._rank - other._rank)
        } else container[fileName] = content
      }
    }
    return container
  }

  return resolveWithPath()
}

module.exports = resolve
