import * as React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { useTheme } from 'react-native-paper'

import HomePage from '../../pages/Home'
import SearchPage from '../../pages/Search'
import AddPage from '../../pages/Add'
import ProfilePage from '../../pages/Profile'

const Tab = createMaterialBottomTabNavigator()

const AppRoutes: React.FC = () => {
  const { colors } = useTheme()
  return (
    <Tab.Navigator
      initialRouteName="HomePage"
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
