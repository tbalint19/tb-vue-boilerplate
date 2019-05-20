var MockAdapter = require('axios-mock-adapter')

export const uiMockTodo = (store) => new MockAdapter(store.$api.todo.http, { delayResponse: 3500 })

export const unitTestMockTodo = (store) => new MockAdapter(store.$api.todo.http, { delayResponse: 0 })

export const applyMocks = (mockTodo) => {
  mockTodo.onPost('/posts').reply(201, { username: "belaFromMock" })
}
