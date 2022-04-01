import * as React from 'react'
import { View } from 'react-native'
import { TextInput, Title, Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import type { StackNavigationProp } from '@react-navigation/stack'

import { styles } from './index.style'
import { AccessResetPassword } from '../../../redux'

interface ForgotPasswordEmailProps {
  navigation: StackNavigationProp<{}>
}
const ForgotPasswordEmail = ({ navigation }: ForgotPasswordEmailProps) => {
  const dispatch = useDispatch()
  const [tGeneral] = useTranslation('general')
  const [t] = useTranslation('forgotPassword')

  const [isLoading, setIsLoading] = React.useState(false)
  const [userLogin, setUserLogin] = React.useState('')

  async function onForgotPassword() {
    setIsLoading(true)
    await dispatch(AccessResetPassword({ userLogin }))
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
        <Title style={styles.description}>{t('description')}</Title>
      </View>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          label={tGeneral('emailOrUsername')}
          value={userLogin}
          onChangeText={text => setUserLogin(text)}
        />
      </View>
      <View style={[styles.row, styles.justifyContentCenter]}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={onForgotPassword}
          disabled={isLoading || !userLogin}
          loading={isLoading}
        >
          {t('sendLoginLink')}
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

export default ForgotPasswordEmail
