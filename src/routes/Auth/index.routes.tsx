import React from 'react'
import  { createStackNavigator } from '@react-navigation/stack'

import SignInUp from '../../pages/SignInUp/'

const AuthStack = createStackNavigator()

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator headerMode="none" >
    <AuthStack.Screen name="SignInUp" component={SignInUp} />
  </AuthStack.Navigator>
)

export default AuthRoutes
