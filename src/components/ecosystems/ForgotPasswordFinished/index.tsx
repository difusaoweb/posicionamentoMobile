import * as React from 'react'
import { View } from 'react-native'
import { Title, Button, Subheading } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import type { StackNavigationProp } from '@react-navigation/stack'

import { styles } from './index.style'
// import { accessResetPasswordFinished } from '../../../redux'

interface ForgotPasswordFinishedProps {
  navigation: StackNavigationProp<{}>
}
export const ForgotPasswordFinished = ({
  navigation
}: ForgotPasswordFinishedProps) => {
  const dispatch = useDispatch()
  const [tGeneral] = useTranslation('general')
  const [t] = useTranslation('forgotPassword')

  async function handleGoLogIn() {
    // await dispatch(accessResetPasswordFinished())
    navigation.navigate('AccessRoutes', { screen: 'LogInPage' })
  }

  return (
    <>
      <View style={[styles.row, styles.justifyContentCenter]}>
        <Title>{t('forgotPasswordFinished.title')}</Title>
      </View>
      <View style={[styles.row, styles.justifyContentCenter, styles.mB16]}>
        <Subheading>{t('forgotPasswordFinished.subTitle')}</Subheading>
      </View>
      <View style={[styles.row, styles.justifyContentCenter]}>
        <Button mode="contained" style={styles.button} onPress={handleGoLogIn}>
          {tGeneral('logIn')}
        </Button>
      </View>
    </>
  )
}
