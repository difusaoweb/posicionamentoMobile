import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import LogIn from '../../pages/LogIn'
import SignUp from '../../pages/SignUp'
import RecoveryPass from '../../pages/RecoveryPass'

const AccessStack = createStackNavigator()

const AccessRoutes: React.FC = () => (
  <AccessStack.Navigator headerMode="none" >
    <AccessStack.Screen name="LogIn" component={LogIn} />
    <AccessStack.Screen name="SignUp" component={SignUp} />
    <AccessStack.Screen name="RecoveryPass" component={RecoveryPass} />
  </AccessStack.Navigator>
)

export default AccessRoutes
