import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { locales } from '@/content'

Vue.use(VueI18n)

const supportedLocales =  Object.keys(locales)

const browserLocale = navigator.languages && navigator.languages.length
  ? navigator.languages[0].split('-')[0]
  : navigator.userLanguage ||
    navigator.language ||
    navigator.browserLanguage ||
    null

const defaultLocale = supportedLocales.includes(browserLocale) ? browserLocale : process.env.VUE_APP_I18N_DEFAULT_LOCALE

export default new VueI18n({
  locale: defaultLocale,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
  messages: locales,
  silentTranslationWarn: true,
})
