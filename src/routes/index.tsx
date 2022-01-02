import React from 'react'
import  { createStackNavigator } from '@react-navigation/stack'
import AppLoading from 'expo-app-loading'

import { useAppDispatch } from '../hooks'
import { getStorageData as getStorageDataRedux } from '../redux/reducers/signInUpPage'
import AppRoutes from './App/index.routes'
import AuthRoutes from './Auth/index.routes'

const Stack = createStackNavigator()


const Routes: React.FC = () => {
  const [isReady, setIsReady] = React.useState(true)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    function loadStorageData() {
      dispatch(getStorageDataRedux())
      setIsReady(false)
    }
    loadStorageData()
  }, [])

  if(isReady)
    return <AppLoading />

  return(
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AppRoutes" component={AppRoutes} />
      <Stack.Screen name="AuthRoutes" component={AuthRoutes} />
    </Stack.Navigator>
  )
}

export default Routes
