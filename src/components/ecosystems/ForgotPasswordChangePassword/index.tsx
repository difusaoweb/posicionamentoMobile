import * as React from 'react'
import { View } from 'react-native'
import { TextInput, Title, Button, Subheading } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { styles } from './index.style'
import { accessResetPasswordChangePassword } from '../../../redux'

const ForgotPasswordChangePassword = () => {
  const dispatch = useDispatch()
  const [tGeneral] = useTranslation('general')
  const [t] = useTranslation('forgotPassword')

  const [isLoading, setIsLoading] = React.useState(false)
  const [password, setPassword] = React.useState('')
  const [password2, setPassword2] = React.useState('')
  const [displayPasswordText, setDisplayPasswordText] = React.useState(false)
  const [displayPassword2Text, setDisplayPassword2Text] = React.useState(false)

  async function handleChangePassword() {
    setIsLoading(true)
    await dispatch(accessResetPasswordChangePassword({ password }))
    setIsLoading(false)
  }

  return (
    <>
      <View style={[styles.row, styles.justifyContentCenter]}>
        <Title>{t('forgotPasswordChangePassword.title')}</Title>
      </View>
      <View style={[styles.row, styles.justifyContentCenter, styles.mB16]}>
        <Subheading>{t('forgotPasswordChangePassword.subTitle')}</Subheading>
      </View>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          label={t('forgotPasswordChangePassword.newPassword')}
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
        <TextInput
          style={styles.input}
          label={t('forgotPasswordChangePassword.newPasswordAgain')}
          value={password2}
          onChangeText={text => setPassword2(text)}
          secureTextEntry={!displayPassword2Text}
          right={
            <TextInput.Icon
              name={displayPassword2Text ? 'eye-off' : 'eye'}
              onPress={() => setDisplayPassword2Text(!displayPassword2Text)}
              forceTextInputFocus={false}
            />
          }
        />
      </View>
      <View style={[styles.row, styles.justifyContentCenter]}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleChangePassword}
          disabled={
            isLoading || !password || !password2 || password !== password2
          }
          loading={isLoading}
        >
          {t('forgotPasswordChangePassword.resetPassword')}
        </Button>
      </View>
    </>
  )
}

export default ForgotPasswordChangePassword
