const authNotification = (app, {title, text, type, to}) => app.$notify(
  { title: app.$t(title), text: app.$t(text), type: type, group: 'auth' }
)

export const reportLoginClientError = (app) => authNotification(app,
  { title: 'notification.login.error.client.title', text: 'notification.login.error.client.text', type: 'error' }
)

export const reportLoginServerError = (app) => authNotification(app,
  { title: 'notification.login.error.server.title', text: 'notification.login.error.server.text', type: 'error' }
)

export const reportLoginSuccess = (app) => authNotification(app,
  { title: 'notification.login.success.title', text: 'notification.login.success.title', type: 'success' }
)

export const reportLogout = (app) => authNotification(app,
  { title: 'notification.logout.title', text: 'notification.logout.text', type: 'warn' }
)
