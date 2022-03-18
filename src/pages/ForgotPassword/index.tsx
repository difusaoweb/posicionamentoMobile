import React from 'react'
import { View } from 'react-native'
import { Headline } from 'react-native-paper'
import type { StackNavigationProp } from '@react-navigation/stack'

import ScreenWrapper from '../../ScreenWrapper'

type ForgotPasswordPageProps = {
  navigation: StackNavigationProp<{}>
}
const ForgotPasswordPage = ({ navigation }: ForgotPasswordPageProps) => {
  return (
    <ScreenWrapper>
      <Headline>Restaurar senha</Headline>
    </ScreenWrapper>
  )
}

export default ForgotPasswordPage
