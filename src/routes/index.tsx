import React, { useEffect, useState } from 'react'
import  { createStackNavigator } from '@react-navigation/stack'
import AppLoading from 'expo-app-loading'
import { useDispatch } from 'react-redux'

import { getLocalStorage } from '../redux'
import AppRoutes from './App/index.routes'
// import AuthRoutes from './Auth/index.routes'

const Stack = createStackNavigator()

const Routes: React.FC = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  function refreshLocalStorage() {
    dispatch(getLocalStorage())
  }

  useEffect(() => {
    refreshLocalStorage()

    setIsLoading(false)
  }, [])

  if(isLoading)
    return <AppLoading />

  return(
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AppRoutes" component={AppRoutes} />
      {/* <Stack.Screen name="AuthRoutes" component={AuthRoutes} /> */}
    </Stack.Navigator>
  )
}

export default Routes
