import axios from 'axios'

export default (() => {

  let http = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
  })

  let getTodo = ({ userId }) => http.get("/posts", { params: { userId } })

  let addTodo = ({ title, text }) => http.post("/posts", { title, text })

  return {
    getTodo,
    addTodo
  }

})()
