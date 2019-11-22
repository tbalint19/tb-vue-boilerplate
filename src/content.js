const contentFiles = require.context('@/../public/content', true, /\.json$/)

const isList = key => key.split('/').length === 3
const listName = key => key.split('/')[1]

const content = {}
contentFiles.keys().forEach((key) => {
  if (isList(key)) {
    if (!content[listName(key)]) {
      content[listName(key)] = []
    }
    content[listName(key)].push(contentFiles(key))
  }
  else {
    content[key.replace(/(\.\/|\.json)/g, '')] = contentFiles(key)
  }
})

export default content
