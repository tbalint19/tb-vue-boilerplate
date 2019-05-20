import TodoApi from './_todo.js'

const API = (() => {
  return {
    todo: new TodoApi()
  }
})()

export default API
