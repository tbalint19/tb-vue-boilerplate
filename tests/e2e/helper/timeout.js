const timeout = (seconds) => process.env.VUE_APP_E2E_DEMO_MODE ? seconds * 1000 : 0

module.exports = {
  timeout
}
