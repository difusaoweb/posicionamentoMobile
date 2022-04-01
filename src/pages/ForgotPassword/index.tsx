import * as React from 'react'
import { View } from 'react-native'
import { Appbar, useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
import type { StackNavigationProp } from '@react-navigation/stack'
import { useTranslation } from 'react-i18next'

import ScreenWrapper from '../../ScreenWrapper'
import { styles } from './index.style'
import { RootState } from '../../redux'
import Logo from '../../assets/images/logo.svg'
import ForgotPasswordEmail from '../../components/ecosystems/ForgotPasswordEmail'
import ForgotPasswordToken from '../../components/ecosystems/ForgotPasswordToken'

interface ForgotPasswordPageProps {
  navigation: StackNavigationProp<{}>
}
const ForgotPasswordPage = ({ navigation }: ForgotPasswordPageProps) => {
  const { isAuthenticated, resetPassword } = useSelector(
    (state: ReturnType<RootState>) => state.access
  )
  const [t] = useTranslation('forgotPassword')
  const { colors } = useTheme()

  if (isAuthenticated) {
    navigation.navigate('AppRoutes', { screen: 'TabRoutes' })
  }

  return (
    <>
      <Appbar style={{ backgroundColor: colors.background }}>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
        <Appbar.Content title={t('title')} />
      </Appbar>
      <ScreenWrapper>
        <View style={styles.container}>
          <View style={[styles.row, styles.justifyContentCenter]}>
            <Logo style={styles.logo} width={120} height={40} />
          </View>
          {!resetPassword ? (
            <ForgotPasswordEmail navigation={navigation} />
          ) : (
            <ForgotPasswordToken />
          )}
        </View>
      </ScreenWrapper>
    </>
  )
}

export default ForgotPasswordPage
