import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector, useDispatch } from 'react-redux'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { useTheme } from 'react-native-paper'

import { getIsAuthenticated, getCurrentUser, getCurrentToken, RootState } from '../redux'
import AppRoutes from './App/index.routes'
import AccessRoutes from './Access/index.routes'
import NotificationAlert from '../components/atoms/NotificationAlert'
import Loading from '../components/atoms/Loading'
import BannerHeader from '../components/atoms/BannerHeader'

const Stack = createStackNavigator()

const Routes: React.FC = () => {
  const dispatch = useDispatch()
  const { currentToken, isAuthenticated } = useSelector((state: RootState) => state.access)
  const { colors } = useTheme()

  const [isLoading, setIsLoading] = useState(true)

  async function getLocalStorage() {
    await dispatch(getCurrentToken())
    console.log('getCurrentToken')
    console.log(currentToken)
    await dispatch(getCurrentUser())
    setIsLoading(false)
  }
  async function onGetIsAuthenticated() {
    console.log('onGetIsAuthenticated')
    console.log(isAuthenticated)
    await dispatch(getIsAuthenticated())
  }

  useEffect(() => {
    getLocalStorage()
    if(!!currentToken) {
      onGetIsAuthenticated()
    }
  }, [])

  if(isLoading) return <Loading />

  return(
    <View style={[ styles.app, { backgroundColor: colors.background } ]}>
      <BannerHeader />
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="AppRoutes" component={AppRoutes} />
        <Stack.Screen name="AccessRoutes" component={AccessRoutes} />
      </Stack.Navigator>
      <NotificationAlert />
      <BannerHeader />
    </View>
  )
}

const styles = StyleSheet.create({
  app: {
    width: '100%',
    height: '100%',
    paddingTop: getStatusBarHeight()
  }
})

export default Routes
