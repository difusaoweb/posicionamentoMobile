import * as React from 'react'
import { AppRegistry } from 'react-native'
import { Provider as PaperProvider, DarkTheme } from 'react-native-paper'
import { Provider as ReduxProvider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { I18nextProvider } from 'react-i18next'

import i18n from './src/locales/index'
import Routes from './src/routes'
import { store } from './src/redux'

import { StatusBar } from 'expo-status-bar'

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      stronglyAgree: string
      agree: string
      neutral: string
      disagree: string
      stronglyDisagree: string
    }
  }
}

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#857dcc',
    accent: DarkTheme.colors.disabled,

    stronglyAgree: '#519668',
    agree: '#5299e0',
    neutral: '#a7a7a7',
    disagree: '#d5a439',
    stronglyDisagree: '#c77171'
  }
}

const App: React.FC = () => {
  return (
    <>
      <StatusBar style="light" />
      <PaperProvider theme={theme}>
        <ReduxProvider store={store}>
          <I18nextProvider i18n={i18n}>
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
          </I18nextProvider>
        </ReduxProvider>
      </PaperProvider>
    </>
  )
}

AppRegistry.registerComponent('my-app', () => App)
export default App
