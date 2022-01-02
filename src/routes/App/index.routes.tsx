import React from 'react'
import  { createStackNavigator } from '@react-navigation/stack'

import TabRoutes from './tab.routes'
import AffirmationPage from '../../pages/Affirmation'

const AppStack = createStackNavigator()

const AppRoutes: React.FC = () => (
  <AppStack.Navigator headerMode="none" >
    <AppStack.Screen
      name="TabRoutes"
      component={TabRoutes}
      options={{ headerShown: false }}
    />
    <AppStack.Screen name="AffirmationPage" component={AffirmationPage} />
  </AppStack.Navigator>
)

export default AppRoutes
