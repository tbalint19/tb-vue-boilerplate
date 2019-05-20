import Vue from 'vue'
import root from '../main'

const authNotification = ({title, text, type, to}) => root.$notify(
  { title: root.$t(title), text: root.$t(text), type: type, group: 'auth' }
)

export const reportLoginClientError = () => authNotification(
  { title: 'notification.login.error.client.title', text: 'notification.login.error.client.text', type: 'error' }
)

export const reportLoginServerError = () => authNotification(
  { title: 'notification.login.error.server.title', text: 'notification.login.error.server.text', type: 'error' }
)

export const reportLoginSuccess = () => authNotification(
  { title: 'notification.login.success.title', text: 'notification.login.success.title', type: 'success' }
)

export const reportLogout = () => authNotification(
  { title: 'notification.logout.title', text: 'notification.logout.text', type: 'warn' }
)
