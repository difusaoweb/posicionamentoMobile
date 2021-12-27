import React from 'react'
import  { createStackNavigator } from '@react-navigation/stack'

import AppRoutes from './App/index.routes'
import AuthRoutes from './Auth/index.routes'

const Stack = createStackNavigator()


const Routes = () => {
  return(
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="AppRoutes"
        component={AppRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AuthRoutes" component={AuthRoutes} />
    </Stack.Navigator>
  )
}

export default Routes
