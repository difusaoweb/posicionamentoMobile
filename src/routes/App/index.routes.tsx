import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { TabRoutes } from './tab.routes'
import { AffirmationPage } from '../../pages/Affirmation'
import { SettingsPage } from '../../pages/Settings'

const AppStack = createStackNavigator()

export const AppRoutes: React.FC = () => (
  <AppStack.Navigator headerMode="none">
    <AppStack.Screen name="TabRoutes" component={TabRoutes} />
    <AppStack.Screen name="AffirmationPage" component={AffirmationPage} />
    <AppStack.Screen name="SettingsPage" component={SettingsPage} />
  </AppStack.Navigator>
)
