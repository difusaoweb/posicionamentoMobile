import * as React from 'react'
import { Provider as PaperProvider, DarkTheme } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider as ReduxProvider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'

import { Routes } from './src/routes'
import store from './src/redux'

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#857dcc',
    accent: 'yellow'
  }
}


export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </ReduxProvider>
  )
}
