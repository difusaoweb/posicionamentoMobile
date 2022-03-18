import * as React from 'react'
import { View, ScrollView } from 'react-native'
import { Appbar, TextInput, Title, Button, useTheme } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import type { StackNavigationProp } from '@react-navigation/stack'

import ScreenWrapper from '../../ScreenWrapper'
import { styles } from './index.style'
import { getSignIn } from '../../redux'
import Loading from '../../components/atoms/Loading'
import Logo from '../../assets/images/sign-in/bower.svg'

interface SignInPageProps {
  navigation: StackNavigationProp<{}>
}
const SignInPage = ({ navigation }: SignInPageProps) => {
  const dispatch = useDispatch()
  const [t] = useTranslation('signIn')
  const { colors } = useTheme()

  const [isLoading, setIsLoading] = React.useState(false)
  const [userLogin, setUserLogin] = React.useState('')
  const [userPass, setUserPass] = React.useState('')
  const [flatTextSecureEntry, setFlatTextSecureEntry] = React.useState(true)

  async function onSignIn() {
    setIsLoading(true)
    await dispatch(getSignIn({ userLogin, userPass }))

    setIsLoading(false)
  }

  function goSignUp() {
    navigation.navigate('AccessRoutes', { screen: 'SignUpPage' })
  }

  function onForgotPassword() {
    navigation.navigate('AccessRoutes', { screen: 'ForgotPasswordPage' })
  }

  if (isLoading) return <Loading />

  return (
    <>
      <Appbar style={{ backgroundColor: colors.background }}>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
        <Appbar.Content title={t('signIn')} />
      </Appbar>
      <ScreenWrapper>
        <View style={styles.container}>
          <Logo />
          <View style={styles.row}>
            <Title>Olá! Digite o seu e-mail ou usuário</Title>
          </View>
          <TextInput
            style={styles.input}
            label={t('emailOrUsername')}
            value={userLogin}
            onChangeText={text => setUserLogin(text)}
          />
          <TextInput
            style={[styles.input, styles.inputPassword]}
            label={t('password')}
            value={userPass}
            onChangeText={text => setUserPass(text)}
            secureTextEntry={flatTextSecureEntry}
            right={
              <TextInput.Icon
                name={flatTextSecureEntry ? 'eye' : 'eye-off'}
                onPress={() => setFlatTextSecureEntry(!flatTextSecureEntry)}
                forceTextInputFocus={false}
              />
            }
          />
          <Button
            mode="text"
            onPress={onForgotPassword}
            style={styles.buttonLeft}
          >
            {t('forgotPassword')}
          </Button>
          <Button
            mode="contained"
            style={[styles.button, styles.buttonSignIn]}
            onPress={onSignIn}
            disabled={isLoading || !userLogin || !userPass}
          >
            {t('signIn')}
          </Button>
          <Button mode="outlined" style={styles.button} onPress={goSignUp}>
            {t('signUp')}
          </Button>
        </View>
      </ScreenWrapper>
    </>
  )
}

export default SignInPage
