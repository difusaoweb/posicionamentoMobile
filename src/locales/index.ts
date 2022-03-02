import * as Localization from 'expo-localization'
import i18n from 'i18next'

import en from './en'
import pt from './pt'

i18n.init({
  interpolation: { escapeValue: false },
  lng: Localization.locale,
  fallbackLng: ['en', 'pt'],
  lowerCaseLng: true,
  resources: {
    pt: pt,
    en: en
  }
})

export default i18n
