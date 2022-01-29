import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import LogInPage from '../../pages/LogIn'
import SignUpPage from '../../pages/SignUp'
import RecoveryPassPage from '../../pages/RecoveryPass'

const AccessStack = createStackNavigator()

const AccessRoutes: React.FC = () => (
  <AccessStack.Navigator headerMode="none">
    <AccessStack.Screen name="LogInPage" component={LogInPage} />
    <AccessStack.Screen name="SignUpPage" component={SignUpPage} />
    <AccessStack.Screen name="RecoveryPassPage" component={RecoveryPassPage} />
  </AccessStack.Navigator>
)

export default AccessRoutes
