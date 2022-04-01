import * as Localization from 'expo-localization'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import pt from './pt'
import en from './en'

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: Localization.locale,
  fallbackLng: ['pt', 'en'],
  compatibilityJSON: 'v3',
  lowerCaseLng: true,
  resources: { pt: pt, en: en },
  react: {
    useSuspense: false
  }
})

export default i18next
