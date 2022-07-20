import * as React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { useTheme } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTranslation } from 'react-i18next'

import { HomePage } from '../../pages/Home'
import { TrendingPage } from '../../pages/Trending'
import { SearchPage } from '../../pages/Search'
import { AddPage } from '../../pages/Add'
import { ProfilePage } from '../../pages/Profile'

const TabStack = createMaterialBottomTabNavigator()

interface TabInterface {
  name: string
  component: React.ComponentType<any>
  options: {
    label: string
    icon: string
  }
}
export const TabRoutes: React.FC = () => {
  const [t] = useTranslation('tabRoutes')

  const tabsItens: TabInterface[] = [
    {
      name: 'HomePage',
      component: HomePage,
      options: {
        label: t('homePage'),
        icon: 'home'
      }
    },
    {
      name: 'TrendingPage',
      component: TrendingPage,
      options: {
        label: t('trendingPage'),
        icon: 'fire'
      }
    },
    {
      name: 'SearchPage',
      component: SearchPage,
      options: {
        label: t('searchPage'),
        icon: 'magnify'
      }
    },
    {
      name: 'AddPage',
      component: AddPage,
      options: {
        label: t('addPage'),
        icon: 'plus'
      }
    },
    {
      name: 'ProfilePage',
      component: ProfilePage,
      options: {
        label: t('profilePage'),
        icon: 'account'
      }
    }
  ]
  const { colors } = useTheme()

  return (
    <TabStack.Navigator
      initialRouteName="HomePage"
      activeColor={colors.text}
      inactiveColor={colors.disabled}
      barStyle={{ backgroundColor: colors.primary }}
    >
      {tabsItens.map((tab, index) => (
        <TabStack.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarLabel: tab.options.label,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name={tab.options.icon}
                color={color}
                size={26}
              />
            )
          }}
        />
      ))}
    </TabStack.Navigator>
  )
}
