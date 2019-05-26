const files = require.context('.', false, /\.js$/)
const mocks = []

files.keys().forEach(key => {
  if (key === './index.js') return
  mocks.push(files(key).default)
})

export const applyUIMocks = (domains) => {
  mocks.forEach(mock => mock.applyForUI(domains))
}

export const applyUnitMocks = (domains) => {
  mocks.forEach(mock => mock.applyForUnit(domains))
}
