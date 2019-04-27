# Data flow

Basic flow:
  - User interaction -> Commit to store -> Mutate state -> UI update (bound to store.state)

Async flow:
  - User interaction -> Commit to store -> Mutate state (loading...) -> UI update -> request sending -> response -> Commit to store ( + notification if needed) -> Mutate state (with response data) -> UI update

Complex flow:
  - Complex user interaction start -> component local state update -> complex user interaction end -> Commit to store -> Mutate state (with complex data) -> UI update

v-model:
  - !!! getter setter, "two-way computed property" (Vuex)
