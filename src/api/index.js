import TodoApi from './_todo.js'

const api = (() => {
  return {
    todo: new TodoApi()
  }
})()

export default api
