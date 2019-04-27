import axios from 'axios'

module.exports = (() => {

  let http = axios.create({
    baseURL: 'https://some-domain.com/api/'
  })

  let getTodo = ({ id }) => http.get("/api/todo", params: { id })

  let addTodo = ({ title, text }) => http.post("/api/todo", { title, text })

  return {
    getTodo,
    addTodo
  }

})()
