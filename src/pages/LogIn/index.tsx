import React from 'react'
import { useTheme, Appbar } from 'react-native-paper'
import type { StackNavigationProp } from '@react-navigation/stack'
import { useSelector } from 'react-redux'

import ScreenWrapper from '../../ScreenWrapper'
import LogInLogInPage from '../../components/ecosystems/LogInLogInPage'
import { RootState } from '../../redux'

interface LogInPageProps {
  navigation: StackNavigationProp<{}>
}
const LogInPage = ({ navigation }: LogInPageProps) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.access)
  const { colors } = useTheme()

  if(!!isAuthenticated) {
    navigation.goBack()
  }

  return (
    <ScreenWrapper>
      <Appbar style={{ backgroundColor: colors.background }}>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Entrar" />
      </Appbar>
      <LogInLogInPage />
    </ScreenWrapper>
  )
}

export default LogInPage
