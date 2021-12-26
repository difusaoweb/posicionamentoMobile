import * as React from 'react'
import { Provider as PaperProvider, DarkTheme } from 'react-native-paper'
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

import { StatusBar } from 'expo-status-bar'

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <PaperProvider theme={theme}>
        <ReduxProvider store={store}>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </ReduxProvider>
      </PaperProvider>
    </>
  )
}
