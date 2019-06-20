import store from "../../store"
import { attemptAuthenticate } from "./attemptAuthenticate"

export const attemptAuthorize = cred => (to, from, next) => {
  authenticate(to, from, next)
  if (
    store.state.user.role == cred ||
    store.state.user.permissions.includes(cred)
  )
    next()
  else next("/login")
}
