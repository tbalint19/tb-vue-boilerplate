import axios from 'axios'

export default class Domain {
  constructor() {
    this.http = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
    })
  }

  login({ username, password }) {
    return this.http.post('/todos', {
      title: username,
      text: password,
    })
  }
}
