import * as React from 'react'
import { View } from 'react-native'
import { TextInput, Title, Button, Subheading } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import type { StackNavigationProp } from '@react-navigation/stack'

import { styles } from './index.style'
import { accessResetPasswordVerifyCode } from '../../../redux'

interface ForgotPasswordVerifyCodeProps {
  navigation: StackNavigationProp<{}>
}
const ForgotPasswordVerifyCode = ({
  navigation
}: ForgotPasswordVerifyCodeProps) => {
  const dispatch = useDispatch()
  const [tGeneral] = useTranslation('general')
  const [t] = useTranslation('forgotPassword')

  const [isLoading, setIsLoading] = React.useState(false)
  const [token, setToken] = React.useState('')

  async function handleVeryCode() {
    setIsLoading(true)
    await dispatch(accessResetPasswordVerifyCode({ token }))
    setIsLoading(false)
  }

  function goLogIn() {
    navigation.navigate('AccessRoutes', { screen: 'LogInPage' })
  }
  function goSignUp() {
    navigation.navigate('AccessRoutes', { screen: 'SignUpPage' })
  }

  return (
    <>
      <View style={[styles.row, styles.justifyContentCenter]}>
        <Title>{t('forgotPasswordVerifyCode.title')}</Title>
      </View>
      <View style={[styles.row, styles.justifyContentCenter, styles.mB16]}>
        <Subheading>{t('forgotPasswordVerifyCode.subTitle')}</Subheading>
      </View>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          label={tGeneral('code')}
          value={token}
          onChangeText={text => setToken(text)}
        />
      </View>
      <View style={[styles.row, styles.justifyContentCenter]}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleVeryCode}
          disabled={isLoading || !token}
          loading={isLoading}
        >
          {t('forgotPasswordVerifyCode.verifyCode')}
        </Button>
      </View>
      <View style={[styles.row, styles.justifyContentSpaceBetween]}>
        <Button mode="text" style={styles.button} onPress={goLogIn}>
          {tGeneral('logIn')}
        </Button>
        <Button mode="text" style={styles.button} onPress={goSignUp}>
          {tGeneral('signUp')}
        </Button>
      </View>
    </>
  )
}

export default ForgotPasswordVerifyCode
