import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SignInPage from '../../pages/SignIn'
import SignUpPage from '../../pages/SignUp'
import RecoveryPassPage from '../../pages/RecoveryPass'

const AccessStack = createStackNavigator()

const AccessRoutes: React.FC = () => (
  <AccessStack.Navigator headerMode="none">
    <AccessStack.Screen name="SignInPage" component={SignInPage} />
    <AccessStack.Screen name="SignUpPage" component={SignUpPage} />
    <AccessStack.Screen name="RecoveryPassPage" component={RecoveryPassPage} />
  </AccessStack.Navigator>
)

export default AccessRoutes
