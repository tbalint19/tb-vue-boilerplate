import axios from 'axios'

export default class TodoApi {
  constructor() {
    this.http = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com'
    })
  }

  getTodo(userId) {
    return this.http.get("/posts", { params: { userId } })
  }

  addTodo({ title, text }) {
    return this.http.post("/posts", { title, text })
  }
}
