const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: '../public/locales',
      enableInSFC: false
    }
  },

  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, 'dist'),
        routes: [ '/', '/about' ],
      })
    ]
  }
}
