import * as React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme, Caption } from 'react-native-paper'

import {
  accessGetIsAuthenticated,
  accessGetCurrentToken,
  usersGetCurrentUser,
  RootState
} from '../redux'
import AppRoutes from './App/index.routes'
import AccessRoutes from './Access/index.routes'
import NotificationAlert from '../components/atoms/NotificationAlert'
import Loading from '../components/atoms/Loading'
import BannerHeader from '../components/atoms/BannerHeader'
import { styles } from './index.style'

const Stack = createStackNavigator()

const Routes: React.FC = () => {
  const dispatch = useDispatch()
  const { currentToken, isAuthenticated } = useSelector(
    (state: ReturnType<RootState>) => state.access
  )
  const { colors } = useTheme()

  const [isLoading, setIsLoading] = React.useState(true)

  async function onAccessGetCurrentToken() {
    console.log('onAccessGetCurrentToken')
    await dispatch(accessGetCurrentToken())
  }

  async function onAccessGetIsAuthenticated() {
    console.log('onAccessGetIsAuthenticated')
    await dispatch(accessGetIsAuthenticated())
  }

  async function onUsersGetCurrentUser() {
    console.log('onUsersGetCurrentUser')
    await dispatch(usersGetCurrentUser())
  }

  React.useEffect(() => {
    onAccessGetCurrentToken()
  }, [])

  React.useEffect(() => {
    if (currentToken) {
      onAccessGetIsAuthenticated()
    }
    setIsLoading(false)
  }, [currentToken])

  React.useEffect(() => {
    if (isAuthenticated) {
      onUsersGetCurrentUser()
    }
    setIsLoading(false)
  }, [isAuthenticated])

  if (isLoading) return <Loading />

  return (
    <View style={[styles.app, { backgroundColor: colors.background }]}>
      <BannerHeader />
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="AppRoutes" component={AppRoutes} />
        <Stack.Screen name="AccessRoutes" component={AccessRoutes} />
      </Stack.Navigator>
      <BannerHeader />
      <NotificationAlert />
    </View>
  )
}

export default Routes
