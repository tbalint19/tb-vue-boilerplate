module.exports = {

  abortOnAssertionFailure: true,

  waitForConditionPollInterval: 500,

  waitForConditionTimeout: 5000,

  'default': {

    webdriver: {
      port: 9515,
      server_path: './node_modules/.bin/chromedriver',
      start_process: true,
      cli_args: [
        '--port=9515'
      ]
    },

  }
}
