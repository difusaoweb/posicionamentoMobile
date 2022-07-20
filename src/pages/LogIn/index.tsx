import * as React from 'react'
import { View, Image } from 'react-native'
import { Appbar, TextInput, Title, Button, useTheme } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import type { StackNavigationProp } from '@react-navigation/stack'

import { ScreenWrapper } from '../../ScreenWrapper'
import { styles } from './index.style'
import { getLogIn, RootState } from '../../redux'
import LogoImage from '../../assets/images/logo.png'

interface LogInPageProps {
  navigation: StackNavigationProp<{}>
}
export const LogInPage = ({ navigation }: LogInPageProps) => {
  const { isAuthenticated } = useSelector(
    (state: ReturnType<RootState>) => state.access
  )
  const dispatch = useDispatch()
  const [tGeneral] = useTranslation('general')
  const [t] = useTranslation('logIn')
  const { colors } = useTheme()

  const [isLoading, setIsLoading] = React.useState(false)
  const [userLogin, setUserLogin] = React.useState('')
  const [userPass, setUserPass] = React.useState('')
  const [displayPasswordText, setDisplayPasswordText] = React.useState(false)

  async function onLogIn() {
    setIsLoading(true)
    await dispatch(getLogIn({ userLogin, userPass }))

    setIsLoading(false)
  }

  if (isAuthenticated) {
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
        <Appbar.Content title={tGeneral('logIn')} />
      </Appbar>
      <ScreenWrapper>
        <View style={styles.container}>
          <View style={[styles.row, styles.justifyContentCenter, styles.mB16]}>
            <Image source={LogoImage} width={120} height={40} style={{ width: 120, height: 40, resizeMode: 'contain' }} />
          </View>
          <View style={[styles.row, styles.justifyContentCenter]}>
            <Title>{t('title')}</Title>
          </View>
          <View style={[styles.row, styles.justifyContentCenter, styles.mB16]}>
            <Title>{t('description')}</Title>
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
              secureTextEntry={!displayPasswordText}
              right={
                <TextInput.Icon
                  name={displayPasswordText ? 'eye-off' : 'eye'}
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
              onPress={onLogIn}
              disabled={isLoading || !userLogin || !userPass}
              loading={isLoading}
            >
              {t('logIn')}
            </Button>
          </View>
          <View style={[styles.row, styles.rowJustifyEnd]}>
            <Button
              mode="text"
              onPress={onForgotPassword}
              style={styles.button}
            >
              {t('forgotPassword?')}
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
