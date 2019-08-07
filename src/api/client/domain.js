import axios from 'axios'

export default class Domain {
  constructor() {
    this.http = axios.create({
      baseURL: 'http://cas.okdtest.vodafone.hu',
    })
  }

  login({ username, password }) {
    return this.http.post('api/login', {
      username,
      password,
    })
  }
}
