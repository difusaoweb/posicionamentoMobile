import * as React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { useTheme } from 'react-native-paper'
import AppLoading from 'expo-app-loading'

import { useAppSelector, useAppDispatch } from '../../hooks'
import { loadStorageDataAsync, isSigned as isSignedRedux } from '../../redux/reducers/access'
import HomePage from '../../pages/Home'
import SearchPage from '../../pages/Search'
import AddPage from '../../pages/Add'
import ProfilePage from '../../pages/Profile'

const Tab = createMaterialBottomTabNavigator()

const AppRoutes: React.FC = () => {
  const [isReady, setIsReady] = React.useState(true)
  const signed = useAppSelector(isSignedRedux)
  const dispatch = useAppDispatch()

  const { colors } = useTheme()

  React.useEffect(() => {
    function loadStorageData() {
      dispatch(loadStorageDataAsync())
      setIsReady(false)
    }
    loadStorageData()
  }, [])

  if(isReady)
    return <AppLoading />

  return (
    <Tab.Navigator
      initialRouteName="SearchPage"
      // initialRouteName="HomePage"
      activeColor={colors.text}
      inactiveColor={colors.disabled}
      barStyle={{ backgroundColor: colors.primary }}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarLabel: 'Ínicio',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" color={color} size={20} />
          )
        }}
      />
      <Tab.Screen
        name="SearchPage"
        component={SearchPage}
        options={{
          tabBarLabel: 'Procurar',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="search" color={color} size={20} />
          )
        }}
      />
      <Tab.Screen
        name="AddPage"
        component={AddPage}
        options={{
          tabBarLabel: 'Adicionar',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="plus" color={color} size={20} />
          )
        }}
      />
      <Tab.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" color={color} size={20} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default AppRoutes
