const fs = require('fs')

const generate = (filename, obj) => {
  fs.writeFileSync(filename, JSON.stringify(obj, null, 2))
}

module.exports = generate
