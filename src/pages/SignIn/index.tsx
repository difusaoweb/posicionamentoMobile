import * as React from 'react'
import { View } from 'react-native'
import { TextInput, Title, Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import ScreenWrapper from '../../ScreenWrapper'
import { styles } from './index.style'
import { getSignIn } from '../../redux'
import Loading from '../../components/atoms/Loading'

const SignInPage = () => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = React.useState(false)
  const [userLogin, setUserLogin] = React.useState('')
  const [userPass, setUserPass] = React.useState('')
  const [flatTextSecureEntry, setFlatTextSecureEntry] = React.useState(true)

  async function onSignIn() {
    setIsLoading(true)
    await dispatch(getSignIn({ userLogin, userPass }))

    setIsLoading(false)
  }

  if (isLoading) return <Loading />

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Title>Olá! Digite o seu e-mail ou usuário</Title>
        <TextInput
          style={styles.inputContainerStyle}
          label="E-mail ou nome de usúario"
          value={userLogin}
          onChangeText={text => setUserLogin(text)}
        />
        <TextInput
          style={styles.inputContainerStyle}
          label="Senha"
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
          mode="contained"
          style={styles.button}
          onPress={onSignIn}
          disabled={isLoading || !userLogin || !userPass}
        >
          Entrar
        </Button>
      </View>
    </ScreenWrapper>
  )
}

export default SignInPage
