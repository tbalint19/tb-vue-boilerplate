const contentFiles = require.context('@/../static/content', false, /\.json$/)

const content = {}
contentFiles.keys().forEach((key) => {
  content[key.replace(/(\.\/|\.json)/g, '')] = contentFiles(key)
})

export default content
