import Vue from 'vue'
import root from '../main'

export const reportLoginClientError = (vue=root) => vue.$notify(
  { title: vue.$t('login.client.error.title'), text: vue.$t('login.client.error.text'), type: 'error', group: 'auth' }
)

export const reportLoginServerError = (vue=root) => vue.$notify(
  { title: vue.$t('login.server.error.title'), text: vue.$t('login.server.error.text'), type: 'error', group: 'auth' }
)

export const reportLoginSuccess = (vue=root) => vue.$notify(
  { title: vue.$t('login.success.title'), text: vue.$t('login.success.title'), type: 'success', group: 'auth' }
)
