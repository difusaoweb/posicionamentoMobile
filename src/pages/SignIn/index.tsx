import * as React from 'react'
import { View } from 'react-native'
import { Appbar, TextInput, Title, Button, useTheme } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import type { StackNavigationProp } from '@react-navigation/stack'

import ScreenWrapper from '../../ScreenWrapper'
import { styles } from './index.style'
import { getSignIn, RootState } from '../../redux'
import Logo from '../../assets/images/sign-in/logo.svg'

interface SignInPageProps {
  navigation: StackNavigationProp<{}>
}
const SignInPage = ({ navigation }: SignInPageProps) => {
  const { currentToken } = useSelector((state: RootState) => state.access)
  const dispatch = useDispatch()
  const [t] = useTranslation('signIn')
  const { colors } = useTheme()

  const [isLoading, setIsLoading] = React.useState(false)
  const [userLogin, setUserLogin] = React.useState('')
  const [userPass, setUserPass] = React.useState('')
  const [displayPasswordText, setDisplayPasswordText] = React.useState(true)

  async function onSignIn() {
    setIsLoading(true)
    await dispatch(getSignIn({ userLogin, userPass }))

    setIsLoading(false)
  }

  if (currentToken) {
    navigation.navigate('AppRoutes', { screen: 'TabRoutes' })
  }

  function goSignUp() {
    navigation.navigate('AccessRoutes', { screen: 'SignUpPage' })
  }

  function onForgotPassword() {
    navigation.navigate('AccessRoutes', { screen: 'ForgotPasswordPage' })
  }

  return (
    <>
      <Appbar style={{ backgroundColor: colors.background }}>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
        <Appbar.Content title={t('signIn')} />
      </Appbar>
      <ScreenWrapper>
        <View style={styles.container}>
          <View style={[styles.row, styles.justifyContentCenter]}>
            <Logo style={styles.logo} width={120} height={40} />
          </View>
          <View style={[styles.row, styles.justifyContentCenter]}>
            <Title style={styles.description}>{t('description')}</Title>
          </View>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              label={t('emailOrUsername')}
              value={userLogin}
              onChangeText={text => setUserLogin(text)}
            />
          </View>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              label={t('password')}
              value={userPass}
              onChangeText={text => setUserPass(text)}
              secureTextEntry={displayPasswordText}
              right={
                <TextInput.Icon
                  name={displayPasswordText ? 'eye' : 'eye-off'}
                  onPress={() => setDisplayPasswordText(!displayPasswordText)}
                  forceTextInputFocus={false}
                />
              }
            />
          </View>
          <View style={styles.row}>
            <Button
              mode="contained"
              style={[styles.button, styles.buttonWidht100]}
              onPress={onSignIn}
              disabled={isLoading || !userLogin || !userPass}
              loading={isLoading}
            >
              {t('signIn')}
            </Button>
          </View>
          <View style={[styles.row, styles.rowJustifyEnd]}>
            <Button
              mode="text"
              onPress={onForgotPassword}
              style={styles.button}
            >
              {t('forgotPassword')}
            </Button>
          </View>
          <View style={styles.row}>
            <Button
              mode="outlined"
              style={[styles.button, styles.buttonWidht100]}
              onPress={goSignUp}
            >
              {t('signUp')}
            </Button>
          </View>
        </View>
      </ScreenWrapper>
    </>
  )
}

export default SignInPage
