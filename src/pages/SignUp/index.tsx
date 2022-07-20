import * as React from 'react'
import { View, Image } from 'react-native'
import { Text, Appbar, TextInput, Title, Button, useTheme, HelperText } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import type { StackNavigationProp } from '@react-navigation/stack'

import { ScreenWrapper } from '../../ScreenWrapper'
import { styles } from './index.style'
import { reduxUsersCreateUserFunction, RootState } from '../../redux'
import LogoImage from '../../assets/images/logo.png'

interface SignUpPageProps {
  navigation: StackNavigationProp<{}>
}
export const SignUpPage = ({ navigation }: SignUpPageProps) => {
  const { createUserUserId, createUserError } = useSelector(
    (state: ReturnType<RootState>) => state.users
  )
  const dispatch = useDispatch()
  const [tGeneral] = useTranslation('general')
  const [t] = useTranslation('signUp')
  const { colors } = useTheme()

  const [isLoading, setIsLoading] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [displayName, setDisplayName] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [displayPasswordText, setDisplayPasswordText] = React.useState(false)

  async function onSignUp() {
    setIsLoading(true)
    await dispatch(reduxUsersCreateUserFunction({ username, password, email, displayName }))

    setIsLoading(false)
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
        <Appbar.Content title={tGeneral('signUp')} />
      </Appbar>
      <ScreenWrapper>
        <View style={styles.container}>
          <View style={[styles.row, styles.justifyContentCenter, styles.mB16]}>
            <Image source={LogoImage} width={120} height={40} style={{ width: 120, height: 40, resizeMode: 'contain' }} />
          </View>
          <View style={[styles.row, styles.justifyContentCenter]}>
            <Title variant="displaySmall">{t('title')}</Title>
          </View>
          <View style={[styles.row, styles.justifyContentCenter, styles.mB16]}>
            <Text variant="headlineSmall">{t('description')}</Text>
          </View>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              label={tGeneral('email')}
              value={email}
              onChangeText={text => setEmail(text)}
              error={createUserError?.status == 409}
            />
            <HelperText type="error" padding="none" visible={createUserError?.status == 409}>
              Error: {t('emailAlreadyUsed')}
            </HelperText>
          </View>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              label={tGeneral('displayName')}
              value={displayName}
              onChangeText={text => setDisplayName(text)}
            />
          </View>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              label={tGeneral('userName')}
              value={username}
              onChangeText={text => setUsername(text)}
            />
            <HelperText type="error" padding="none" visible={createUserError?.status == 409}>
              Error: {t('usernameAlreadyUsed')}
            </HelperText>
          </View>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              label={tGeneral('password')}
              value={password}
              onChangeText={text => setPassword(text)}
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
              onPress={onSignUp}
              disabled={isLoading || !email || !displayName || !username || !password}
              loading={isLoading}
            >
              {t('signUp')}
            </Button>
          </View>
          <View style={styles.row}>
            <Button
              mode="outlined"
              style={[styles.button, styles.buttonWidht100]}
              onPress={goSignUp}
            >
              {t('logIn')}
            </Button>
          </View>
        </View>
      </ScreenWrapper>
    </>
  )
}
