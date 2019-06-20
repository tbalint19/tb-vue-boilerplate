import axios from 'axios'

export default class DomainAPI {
  constructor() {
    this.http = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com'
    })
  }

  login({ username, password }) {
    return this.http.post("/posts", { title: username, text: password })
  }
}